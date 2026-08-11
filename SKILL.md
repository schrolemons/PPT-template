---
name: artifact-template-source-faithful
description: "Create or revise source-faithful academic and technical PowerPoint presentations with a reusable layout library. Use when the user invokes $artifact-template-source-faithful, selects Source-Faithful 学术汇报, asks to build a PPT from source documents without inventing content, or requires careful handling of multi-point, image, table, source-footer, and speaker-note pages."
---

# Source-Faithful 学术汇报

Create a presentation that is traceable to the user's source material and visually consistent with the retained reference deck.

## Core workflow

1. Read `artifact-template.json` and resolve all paths relative to this skill directory.
2. Read every source file designated by the user before drafting slides. Treat those files as the factual and stylistic authority.
3. Build a compact source ledger that maps each proposed slide to its supporting file, section, page, figure, table, or link.
4. Load [@presentations](plugin://presentations@openai-primary-runtime) and use its reference/template workflow with `assets/reference.pptx`.
5. Select only the layout archetypes needed for the current narrative. Clone or import the reference deck; do not replace its visual system with generic defaults.
6. Draft visible content, the bottom source line, and the speaker notes together so every claim remains traceable.
7. Render the full deck, inspect every slide, run structural checks, and revise until the content and layout both pass.

## Non-negotiable content rules

- Treat the supplied source as the authority. Do not invent claims, conclusions, experiments, completed work, plans, titles, bullet points, examples, or data merely to fill a layout.
- Prefer the source's terminology, descriptions, sentence rhythm, and language level. Paraphrase only when it improves clarity without changing scope or certainty.
- Derive titles from the source. If the source has no title, use a neutral descriptive label; never add an unsupported takeaway headline.
- Preserve qualifiers, uncertainty, units, dates, names, scope limits, exceptions, and distinctions between evidence and interpretation.
- Prefer complete source coverage over an artificially low slide count. Split dense material instead of omitting it or shrinking type.
- If a template slot has no source-supported content, remove the slot, change to a suitable retained layout, or leave an explicit editable placeholder in a template-only deliverable.

## Page-type handling

- Multi-point pages: give each slide one narrative job; use an overview followed by detail slides when needed; keep parallel items at a parallel hierarchy; split content when full explanations do not fit.
- Image pages: use a source-provided or independently verified image only when it contributes evidence or explanation; crop safely, preserve important labels, and add a caption and source. Never fabricate screenshots, logos, diagrams, or visual evidence.
- Table pages: preserve headers, categories, units, footnotes, and comparison logic. Split long tables or move supporting detail to another slide rather than making text unreadably small.
- Process and relationship pages: use a diagram only when sequence, dependency, or structure is clearer visually. Preserve the source semantics and do not add decorative connections that imply unsupported causality.
- Read `references/page-types-and-qa.md` before choosing frames or performing final QA.

## Sources and speaker notes

- Put a visible `Source: ...` line at the bottom of every content slide. Include the exact file, author or organization when available, section or page, and link when applicable. The cover may omit this line.
- Put a complete, directly readable, multi-sentence speaker script in PowerPoint Notes for every slide. Cover the slide's purpose, key points, evidence, and transition.
- End each notes entry with a `[Sources]` block that lists the source details used by that slide.
- Keep scripts in Notes only. Never place labels such as `口播稿`, `讲稿`, or internal drafting instructions on the visible slide.

## Template fidelity

Preserve the retained deck's layouts, typography, geometry, palette, tables, recurring navigation, source footer, and page-number system unless the user explicitly requests a change. Use the reference as a layout library: clone the needed archetypes, replace placeholders, and delete unused frames.
