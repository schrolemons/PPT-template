# Paper Layout Library

Use this reference for chapters that explain several academic papers or methods. The authoritative module instruction is `references/modules/content/paper-reading-display.md`, and its independent module asset is `assets/modules/paper-reading-display.pptx`. Its visible content must always be replaced with the current task's source-supported material.

`assets/paper-layout-library.pptx` remains a compatibility library and visual reference for existing callers; it is not the entry point for new modular paper-reading instances and does not replace the independent module asset.

## Companion asset map

- Slides 1–3 are the core consecutive `one study per slide` examples. Reuse this family when several sibling papers need equal visual weight: emphasize the research name, retain the source-written one-sentence explanation, and separate problem, approach, role, meaning, and workflow instead of merging papers.
- Slide 4 is a paper overview that deliberately avoids repeating the later training stages.
- Slides 5–6 are non-redundant stage-detail pages for the same paper.
- Slides 7–8 pair a figure-led paper overview with a separate training/deployment workflow.
- Slides 9–10 pair a key-interface explanation with a full ordered training workflow.
- Slide 11 is a direct comparison page; it is an allowed multi-paper layout because comparison, rather than formal paper introduction, is the narrative job.

## Paper-per-page default

- When formally introducing research, use one paper per slide if the audience needs to retain that paper's summary, problem, approach, workflow, role, or practical meaning.
- Keep several papers together only on an agenda, taxonomy, survey overview, or direct comparison page. A shared category is not by itself a reason to compress several paper introductions into one slide.
- After splitting, reuse one paper-page family and restore the source document's readable explanatory sentences; do not leave keyword fragments created only by the former space constraint.

## 1. Paper hero

- Use for the first page of a paper or method.
- Put the paper name in the title and preserve the source- or user-written `一句话概括` near the top.
- Give the source figure the dominant visual area. It must remain readable in a full-slide render.
- Use a stable explanatory column: `发现的问题 → 优化实现 → 实际意义 → 机器人形态` when those categories exist.
- If the figure cannot remain legible, move explanation to a second page instead of shrinking the figure.

## 2. Dual-lane training and inference

- Use the same two-lane geometry for sibling papers.
- The upper lane explains training or data preparation; the lower lane explains deployment or inference.
- Number real steps and keep their source order. State what is updated, frozen, removed, or retained at runtime.
- A lane title names the stage; it is not a generic decoration.

## 3. Key interface explanation

- Use only when one interface is essential to understanding why the system works.
- Frame the page with a causal question such as why a latent representation must be converted to physical state.
- Enlarge the relevant source figure and explain input, transformation, output, and downstream use.
- End with a source-supported distinction only when it helps disambiguate two neighboring methods.

## 4. Ordered workflow steps

- Use for a substantial training or inference sequence with six to eight source-defined steps.
- Keep the numbering, names, and order faithful to the source.
- Use a consistent two-row grid with equal visual weight. Do not scatter unexplained components into unused space.
- A bottom takeaway is allowed only when it states a source-supported update/freeze/runtime fact.

## 5. Stage-participation matrix

- Use instead of a static component inventory when modules enter and leave across stages.
- Recommended columns: `阶段`, `参与模块`, `更新 / 冻结`, `输出与下一阶段`.
- The matrix must make temporal order and deployment-time removals explicit.

## Prohibited substitute

Do not use a generic `组件链`, `系统组件`, or `A + B + C` strip merely because the template contains one. A component view is appropriate only for a genuinely parallel architecture or when the source explicitly makes architecture comparison the page's central question.

## Flow semantics

- Use an arrow only when the source supports an actual transition, transformation, dependency, or information flow.
- The arrow endpoints, arrow label, and adjacent explanation must describe the same relationship. If the prose explains a different fact, remove the arrow.
- Prefer numbered stages for temporal order, a stage-participation matrix for modules entering or leaving across phases, and paired fields or tables for non-directional comparison.
