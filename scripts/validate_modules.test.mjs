import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { validateRegistry } from './validate_modules.mjs';

async function fixture(setup = () => {}) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'module-validator-'));
  await fs.mkdir(path.join(root, 'instructions'), { recursive: true });
  await fs.mkdir(path.join(root, 'templates'), { recursive: true });
  await fs.writeFile(path.join(root, 'instructions', 'core.md'), 'core instruction');
  await fs.writeFile(path.join(root, 'templates', 'base.pptx'), 'pptx fixture');
  const modules = [
    {
      id: 'alpha', label: 'Alpha', class: 'structure', instruction: 'instructions/core.md',
      variants: [], dependencies: ['core-contract'], status: 'active', template: 'templates/base.pptx'
    }
  ];
  await setup(modules, root);
  const registryPath = path.join(root, 'registry.json');
  await fs.writeFile(registryPath, JSON.stringify({ modules }, null, 2));
  return { root, registryPath, modules };
}

async function issuesFor(mutator) {
  const { root, registryPath, modules } = await fixture(async (items, fixtureRoot) => mutator(items, fixtureRoot));
  return validateRegistry(registryPath, root);
}

test('rejects duplicate IDs', async () => {
  const result = await issuesFor((items) => items.push({ ...items[0] }));
  assert.equal(result.ok, false);
  assert.match(result.issues.join('\n'), /duplicate.*id/i);
});

test('rejects direct module dependency', async () => {
  const result = await issuesFor((items) => { items[0].dependencies = ['alpha']; });
  assert.equal(result.ok, false);
  assert.match(result.issues.join('\n'), /dependencies.*core-contract/i);
});

test('rejects missing instruction and template', async () => {
  const result = await issuesFor((items) => {
    items[0].instruction = 'instructions/missing.md';
    items[0].template = 'templates/missing.pptx';
  });
  assert.equal(result.ok, false);
  assert.match(result.issues.join('\n'), /instruction/i);
  assert.match(result.issues.join('\n'), /template/i);
});

test('accepts a valid isolated module', async () => {
  const { root, registryPath } = await fixture();
  const result = await validateRegistry(registryPath, root);
  assert.deepEqual(result, { ok: true, issues: [] });
});

test('rejects paths that traverse outside skillRoot', async () => {
  const result = await issuesFor((items) => { items[0].instruction = '../outside.md'; });
  assert.equal(result.ok, false);
  assert.match(result.issues.join('\n'), /outside|travers/i);
});

test('rejects absolute instruction and template paths', async () => {
  const result = await issuesFor((items, root) => {
    items[0].instruction = path.join(root, 'instructions', 'core.md');
    items[0].template = path.join(root, 'templates', 'base.pptx');
  });
  assert.equal(result.ok, false);
  assert.match(result.issues.join('\n'), /absolute/i);
});

test('rejects a non-pptx template', async () => {
  const result = await issuesFor((items) => { items[0].template = 'templates/base.pdf'; });
  assert.equal(result.ok, false);
  assert.match(result.issues.join('\n'), /\.pptx/i);
});

test('rejects template traversal', async () => {
  const result = await issuesFor((items) => { items[0].template = '../outside.pptx'; });
  assert.equal(result.ok, false);
  assert.match(result.issues.join('\n'), /outside|travers/i);
});

test('rejects a symlink that resolves outside skillRoot', async () => {
  const { root, registryPath } = await fixture(async (items, fixtureRoot) => {
    const outside = path.join(path.dirname(fixtureRoot), 'outside-template.pptx');
    await fs.writeFile(outside, 'outside');
    await fs.symlink(outside, path.join(fixtureRoot, 'templates', 'escape.pptx'));
    items[0].template = 'templates/escape.pptx';
  });
  const result = await validateRegistry(registryPath, root);
  assert.equal(result.ok, false);
  assert.match(result.issues.join('\n'), /outside|resolves/i);
});

test('CLI exits 0 for valid and 1 for invalid registries', async () => {
  const { root, registryPath, modules } = await fixture();
  const script = fileURLToPath(new URL('./validate_modules.mjs', import.meta.url));
  const args = ['--registry', registryPath, '--skill-root', root];
  const valid = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
  assert.equal(valid.status, 0, valid.stderr);
  modules[0].class = 'invalid';
  await fs.writeFile(registryPath, JSON.stringify({ modules }));
  const invalid = spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
  assert.equal(invalid.status, 1);
  assert.match(invalid.stderr, /class/i);
});

test('does not mutate registry or module files', async () => {
  const { root, registryPath } = await fixture();
  const beforeRegistry = await fs.readFile(registryPath, 'utf8');
  const beforeInstruction = await fs.readFile(path.join(root, 'instructions', 'core.md'), 'utf8');
  const beforeTemplate = await fs.readFile(path.join(root, 'templates', 'base.pptx'), 'utf8');
  const result = await validateRegistry(registryPath, root);
  assert.equal(result.ok, true);
  assert.equal(await fs.readFile(registryPath, 'utf8'), beforeRegistry);
  assert.equal(await fs.readFile(path.join(root, 'instructions', 'core.md'), 'utf8'), beforeInstruction);
  assert.equal(await fs.readFile(path.join(root, 'templates', 'base.pptx'), 'utf8'), beforeTemplate);
});

test('rejects an invalid class', async () => {
  const result = await issuesFor((items) => { items[0].class = 'other'; });
  assert.equal(result.ok, false);
  assert.match(result.issues.join('\n'), /class/i);
});

test('accepts deck-structure-planner with a null template', async () => {
  const { root, registryPath } = await fixture((items) => {
    items[0] = { ...items[0], id: 'deck-structure-planner', template: null };
  });
  const result = await validateRegistry(registryPath, root);
  assert.deepEqual(result, { ok: true, issues: [] });
});
