#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REQUIRED = ['id', 'label', 'class', 'instruction', 'variants', 'dependencies', 'status'];
const CLASSES = new Set(['structure', 'content']);

function inside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

async function checkPath(value, skillRoot, kind, issues, required = true, extension = null) {
  if (value == null || value === '') {
    if (required) issues.push(`${kind} is required`);
    return;
  }
  if (typeof value !== 'string') {
    issues.push(`${kind} must be a relative path string`);
    return;
  }
  if (path.isAbsolute(value)) {
    issues.push(`${kind} must be relative; absolute paths are not allowed: ${value}`);
    return;
  }
  const resolved = path.resolve(skillRoot, value);
  if (!inside(skillRoot, resolved)) {
    issues.push(`${kind} path traverses outside skillRoot: ${value}`);
    return;
  }
  if (extension && path.extname(resolved).toLowerCase() !== extension) {
    issues.push(`${kind} must have ${extension} extension: ${value}`);
    return;
  }
  try {
    const real = await fs.realpath(resolved);
    if (!inside(skillRoot, real)) issues.push(`${kind} resolves outside skillRoot: ${value}`);
    else if (!(await fs.stat(real)).isFile()) issues.push(`${kind} is not a file: ${value}`);
  } catch {
    issues.push(`${kind} file does not exist: ${value}`);
  }
}

export async function validateRegistry(registryPath, skillRoot) {
  const issues = [];
  let registry;
  let root;
  try {
    root = await fs.realpath(skillRoot);
  } catch {
    return { ok: false, issues: ['skillRoot does not exist'] };
  }
  try {
    registry = JSON.parse(await fs.readFile(registryPath, 'utf8'));
  } catch (error) {
    return { ok: false, issues: [`unable to read registry: ${error.message}`] };
  }
  const modules = registry && Array.isArray(registry.modules) ? registry.modules : null;
  if (!modules) return { ok: false, issues: ['registry.modules must be an array'] };
  const ids = new Set();
  for (let index = 0; index < modules.length; index += 1) {
    const mod = modules[index];
    const prefix = `module[${index}]`;
    if (!mod || typeof mod !== 'object' || Array.isArray(mod)) {
      issues.push(`${prefix} must be an object`);
      continue;
    }
    for (const field of REQUIRED) if (!(field in mod)) issues.push(`${prefix} missing required field: ${field}`);
    if (typeof mod.id !== 'string' || !mod.id) issues.push(`${prefix}.id must be a non-empty string`);
    else if (ids.has(mod.id)) issues.push(`duplicate module id: ${mod.id}`);
    else ids.add(mod.id);
    if (!CLASSES.has(mod.class)) issues.push(`${prefix}.class must be structure or content`);
    if (!Array.isArray(mod.dependencies) || mod.dependencies.length !== 1 || mod.dependencies[0] !== 'core-contract') {
      issues.push(`${prefix}.dependencies must equal ["core-contract"]`);
    }
    await checkPath(mod.instruction, root, `${prefix}.instruction`, issues);
    const planner = mod.id === 'deck-structure-planner';
    if (mod.template == null && !planner) issues.push(`${prefix}.template is required`);
    if (mod.template != null) await checkPath(mod.template, root, `${prefix}.template`, issues, true, '.pptx');
  }
  return { ok: issues.length === 0, issues };
}

function argValue(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const registry = argValue(process.argv.slice(2), '--registry');
  const skillRoot = argValue(process.argv.slice(2), '--skill-root');
  if (!registry || !skillRoot) {
    console.error('Usage: node validate_modules.mjs --registry <absolute-json-path> --skill-root <absolute-directory>');
    process.exitCode = 1;
  } else {
    const result = await validateRegistry(registry, skillRoot);
    if (!result.ok) {
      for (const issue of result.issues) console.error(issue);
      process.exitCode = 1;
    }
  }
}
