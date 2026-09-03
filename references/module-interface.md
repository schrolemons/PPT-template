# Module Interface and Maintenance Contract

Use this contract for every module registered in `module-registry.json`.

## Connection fields

Each module instance exposes these fields:

| Field | Contract |
| --- | --- |
| `module_id` | Registry ID of the module definition. |
| `instance_id` | Unique ID for this occurrence in one deck. |
| `chapter_id` | Chapter that owns the occurrence. |
| `section_id` | Independently addressable source or user-defined section. |
| `subsection_label` | Audience-readable label used by agendas and navigation. |
| `narrative_role` | The occurrence's single job in the deck narrative. |
| `source_refs` | Source locations supporting the visible content and Notes. |
| `page_span` | Current inclusive page or page range after pagination. |
| `navigation_state` | Chapter, section, and active-item state applied by orchestration. |

These fields locate and connect a module instance. They do not authorize a structure module to reorder or rewrite the content module's internal fields.

## Isolation and orchestration

- Store each module's instruction separately. Every rendered module owns an independent PPTX under `assets/modules/<module_id>.pptx`; `deck-structure-planner` is orchestration-only and therefore has a null template.
- A module depends only on `core-contract`, never directly on another structure or content module.
- Structure modules form the upper orchestration layer. They may wrap, insert, and sequence content-module instances through a frozen `structure-map`, and may update placement, chapter ownership, navigation state, and final page spans.
- Authority is one-way: content modules do not orchestrate structure, and structure modules do not change content semantics or internal field order.

## Reusable-template placeholder contract

The independent PPTX assets have two states that must not be confused:

1. **Library state.** Replaceable visible text uses semantic guidance labels only, for example `章节标题`, `小节标题`, `分组标题`, `要点标题`, `要点说明`, `输入`, `步骤标题`, `步骤说明`, `处理`, `输出`, `结论`, `证据说明`, `证据边界`, and `来源页码`. Do not embed a concrete paper name, model name, result, robot, experiment, or claim in a replaceable slot. Do not expose production instructions such as “请替换”“空间不足时拆页” on the slide.
2. **Report state.** Every guidance label is replaced by readable, source-faithful language from the current task's designated documents. Preserve the source sentence's causal, procedural, conditional, and role relationships; the generic labels define fields, not the final level of detail.

Layout examples may retain non-textual geometry needed to demonstrate image scale, table structure, or flow direction. Any retained example image must be clearly treated as an image-position example and must not leak its claims into the report. If the image itself would mislead the user about the expected source, use a neutral figure frame labeled `来源原图` instead.

## Candidate extension gate

Use this gate only when a required page has no matching registry module. An unmatched requirement must not trigger ad-hoc authoring inside a production deck or the formal module library. Structural modules remain the upper orchestration layer: an approved content module may expose connection fields, but cannot call sibling content modules or rewrite structure.

Unmatched requirement → load default Presentations → create isolated candidate pages
→ render and show the candidate separately → explain narrative job and fields
→ wait for explicit user approval → create independent module instruction and PPTX
→ validate → add one registry record.

1. Load the default `Presentations` skill. Create the candidate only under the current task workspace, outside the installed skill's formal module assets and outside any production deck.
2. Render and show the candidate separately. State its narrative job; required fields; optional fields; split conditions; and how its connection fields would let the structural layer place it without changing its content semantics.
3. Wait for explicit approval of that exact candidate layout. Approval of the broader deck task, its source material, another module, or a previous candidate does not authorize registration.
4. Only after that approval, create exactly one independent module instruction and exactly one independent PPTX asset, validate them, and append exactly one registry record. Do not couple the new module to another content module.

### Required non-mutation check before approval

Before creating the isolated candidate, hash `module-registry.json` and every existing file under `assets/modules/`. Run the same collection again after candidate creation and require an exact match before asking for approval. Candidate files stay in the task workspace.

```powershell
$skillRoot = 'C:\Users\24329\.codex\skills\artifact-template-source-faithful'
$candidateRoot = 'C:\path\to\current-task-workspace\candidate-layout'
$null = New-Item -ItemType Directory -Force -LiteralPath $candidateRoot
$baselinePath = Join-Path $candidateRoot 'formal-library-pre.sha256.json'
$afterPath = Join-Path $candidateRoot 'formal-library-post.sha256.json'
function Get-FormalLibraryHashes {
  $formalTargets = @((Join-Path $skillRoot 'module-registry.json')) + @(
    Get-ChildItem -LiteralPath (Join-Path $skillRoot 'assets/modules') -File -Recurse |
      Select-Object -ExpandProperty FullName
  )
  $formalTargets | Sort-Object | Get-FileHash -Algorithm SHA256 |
    Sort-Object Path | Select-Object Path, Hash | ConvertTo-Json
}
Get-FormalLibraryHashes | Set-Content -LiteralPath $baselinePath -Encoding utf8

# Create, render, and show candidate pages only below $candidateRoot.

$afterHashes = Get-FormalLibraryHashes
$afterHashes | Set-Content -LiteralPath $afterPath -Encoding utf8
$difference = Compare-Object (Get-Content -LiteralPath $baselinePath) (Get-Content -LiteralPath $afterPath)
if ($difference) {
  throw 'Formal registry or module assets changed before candidate approval.'
}
```

The comparison must produce no output. If it does, stop: do not seek approval or register the candidate until the formal-library change has been reverted or separately authorized. Recompute the target list immediately before the post-hash so newly created formal assets cannot be hidden by a stale list.

## Maintenance operations

### Add

Create one instruction file and one independent PPTX asset, validate the module against the core contract, then add one unique registry record. A non-rendering planner may declare a null template.

### Update

Edit only the target module's instruction and PPTX. Update its registry record only when its ID-facing metadata, paths, or explicit variants change. Render and validate that module before whole-deck QA.

### Delete

Check active `structure-map` references, then remove only the target module's registry record, instruction, and independent PPTX. Do not renumber or rewrite any other module asset.
