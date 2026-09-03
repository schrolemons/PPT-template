---
name: artifact-template-source-faithful
description: "Create or revise source-faithful academic and technical PowerPoint presentations with a reusable, extensible layout library. Use when the user invokes $artifact-template-source-faithful, selects Source-Faithful 学术汇报, asks to build a PPT from source documents without inventing content, or requires careful handling of multi-chapter structure, progressive navigation, multi-point, image, table, source-footer, and speaker-note pages."
---

# Source-Faithful 学术汇报

Create a traceable presentation under the shared [source-fidelity](references/core/source-fidelity.md), [notes-and-sources](references/core/notes-and-sources.md), and [visual-QA](references/core/visual-qa.md) contracts. Use [module-registry.json](module-registry.json) for discovery and [module-interface.md](references/module-interface.md) for connection and maintenance fields.

## Architecture

Structural modules are the upper orchestration layer, not peers of content modules. They freeze and maintain the `structure-map`, insert orientation pages at narrative boundaries, and apply page spans and navigation state. Content modules are the source-faithful page units they organize; structure modules do not rewrite content-module fields or claims.

The required multi-chapter sequence is:

`封面 → 全局总览 → 第一章目录 → 第一章内容 → 第二章目录 → 第二章内容…`

Never stack all chapter-directory pages together. Treat user- or source-defined subparts separated by enumeration commas, commas, semicolons, or numbering as independent `section_id` units unless the user or source explicitly combines them.

## Workflow

1. Read all user-designated sources and preserve the user-specified order.
2. Load only `deck-structure-planner` and freeze the `structure-map` before layout work.
3. Insert structural modules at their narrative positions: whole-deck overview after the cover, each chapter agenda immediately before that chapter's content, and progressive navigation on the content it governs.
4. Route each content unit to exactly one content module in the registry.
5. After any content split, recalculate directory page ranges, navigation page ranges, active states, page numbers, and transitions.
6. Run per-module QA and then whole-deck structure, source, Notes, overflow, rendering, and template-fidelity QA.

After structure planning, read only the references for the modules selected by the frozen `structure-map`; do not load every module reference by default. Use each selected module's independent PPTX asset and keep all claims inside the core evidence boundary.

## Template placeholder state

Treat reusable module PPTX files as field-contract templates, not as miniature sample reports. Their replaceable visible text must use semantic guidance labels such as `章节标题`, `分组标题`, `要点标题`, `要点说明`, `输入`, `处理`, `输出`, and `来源页码`; do not populate those slots with a particular paper, model, conclusion, experiment, or robot. Keep the labels specific enough to reveal hierarchy and reading order, but never add instructions such as “请替换” to the visible slide.

When producing an actual report, replace every guidance label with readable source-faithful wording from the designated documents. The template's generic wording never authorizes compressing the source into labels, keywords, component chains, or terse fragments.

## Unmatched page needs

If a page need has no matching registry entry, follow the candidate approval gate in [module-interface.md](references/module-interface.md#candidate-extension-gate): build and show an isolated candidate under the task workspace, preserve the formal registry and module assets until the user explicitly approves that exact layout, then register one independent module.
