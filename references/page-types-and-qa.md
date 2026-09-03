# Page Types and QA

## Retained layout library

The reference deck contains fifteen starting layout archetypes:

1. Cover page
2. Three-stage path
3. Three-dimension synthesis
4. Two-group overview
5. Context plus table
6. Five-point overview
7. Definition and boundary
8. Four-step process
9. Three-column overview
10. Three-column detail
11. Full-width comparison table
12. Three-way relationship
13. Seven-step process
14. Image-led page
15. Multi-point rows

These archetypes are reusable seeds, not an exhaustive page catalog. Choose the smallest useful set that expresses the source structure, reuse a frame when the same information structure recurs, and derive additional style-consistent variants when no retained frame fits. Do not use every frame by default or force unrelated content into an existing pattern.

## Layout selection rules

- On the cover, reserve the topmost position for `学术汇报`, the bottom-right corner for the reporting year and month, and the right side for a vertical list of report-specific ALL-CAPS English keywords with one keyword or short key phrase per line.
- When the user explicitly specifies multiple chapters or parts, place a whole-deck overview immediately after the cover. Give each chapter its actual name and one concise scope statement in the original order; do not use this page to replace the chapters' own agendas.
- Follow the whole-deck overview with the first chapter agenda and first chapter content. Place every later chapter agenda only when that chapter begins; do not cluster all chapter agendas before the first chapter's content.
- Use overview layouts for classification, scope, or navigation, not for dense explanations.
- For a multi-chapter deck, begin each substantial chapter with a full chapter agenda that previews its contents and sequence. Do not rely on one global agenda to carry the entire narrative.
- On later pages in that chapter, use a compact mini-directory based on the chapter agenda. Keep the navigation geometry stable while changing the active item or sub-stage as the presentation progresses.
- Use semantic mini-directory labels that an audience can understand without remembering an internal code. Do not collapse independent units into labels such as `A / B`; when full labels cannot fit, use hierarchical or multi-row navigation, successive sub-directories, or additional slides.
- Use detail layouts when each point needs a definition, cause, mechanism, evidence, implication, or limitation.
- Use a separated explanatory sidebar when a concise plain-language explanation, model-role distinction, or evidence boundary materially helps orientation. Keep it subordinate to and semantically tied to the main content.
- If several parallel directions, categories, or studies each require explanation, use an overview followed by one detail page per unit instead of forcing all content into a summary table.
- Do not mix independently enumerated key points, categories, or studies in one agenda item or detail treatment solely to save space. Each source-defined unit must remain visible and addressable unless the source explicitly combines it.
- When several adjacent slides represent sibling directions or categories, keep the same layout family and field sequence across them; change only the number or height of entries required by the source.
- After improving a recurring page type later in the deck, revisit earlier instances and apply the same hierarchy where appropriate. A deck must not retain visibly weaker legacy paper pages at the beginning while later sibling pages use the approved structure.
- In sibling subcategory pages, visually foreground research or method names and keep comparable key fields in a stable order across the entire set.
- Use process layouts only for an actual ordered sequence. Use relationship layouts for non-sequential dependencies.
- Use arrows only for a source-supported transition or relationship. The text next to or below the arrow must explain that exact relation; otherwise replace the arrow with non-directional structure.
- Treat arrow semantics as an element-level acceptance test: read the left endpoint, arrow label, right endpoint, and adjacent explanation as one sentence. They must describe the same transition, transformation, dependency, or information flow. An arrow must not serve as a decorative separator for prose about a different relationship.
- Split training and inference when each is a meaningful sequence. State what is learned or updated during training and what remains at runtime during inference.
- Use a table when shared fields make comparison faster than prose. Keep meaningful row and column labels visible.
- Use the image-led layout only when a real image, figure, screenshot, or chart is available and relevant.
- Place a concise, source-faithful one-sentence explanation near the visual entry point of a major study or method page; use the remaining hierarchy for problem, approach, roles or components, workflow, and meaning.
- Use semantic route names instead of `方式一/二/三` or unexplained codes. A navigation label must tell the audience what function, mechanism, or topic the page belongs to.
- For sibling paper introductions, use the same paper-overview family: prominent paper name, large legible source figure, one-sentence summary, and stable comparable fields. Follow with consistently styled workflow pages instead of redesigning each paper independently.
- Do not insert a static component chain between a paper overview and its workflow. If a component-level page is necessary, state the causal question it answers and explain how each interface changes the signal. Otherwise replace it with an ordered workflow or stage-participation matrix.
- Treat source-figure legibility as a hard constraint. If labels cannot be read in a full-slide render, enlarge, crop, or split the visual; do not compensate by repeating the same content as dense adjacent prose.
- If no retained archetype supports the content cleanly, duplicate the closest source frame and extend its content zone into a new variant that preserves the deck's typography, palette, spacing, navigation, footer, and page-number logic.
- If content density exceeds the frame, split the slide. Do not shrink body text, crowd cards, or hide information in ornamental shapes.
- After splitting a crowded slide, re-expand text that had been over-compressed for the former frame. Prefer the source document's complete and readable explanation when it now fits.

## Multi-chapter structure QA

- The cover uses `学术汇报` as its topmost label, shows the reporting year and month at bottom right, and uses one topic-specific ALL-CAPS English keyword or short key phrase per line on the right.
- A multi-chapter deck has a whole-deck overview directly after the cover, before the first chapter agenda.
- The whole-deck overview includes every explicit chapter or part in the requested order and states what each covers without adding unsupported conclusions.
- Chapter agendas appear at their own chapter boundaries, with the corresponding chapter content between adjacent chapter agendas.
- The chapter and subsection order matches the user's requested order or the source structure.
- Every chapter with several substantive subsections begins with an internal agenda that accurately previews the pages that follow.
- Subsequent chapter pages retain a compact mini-directory whose labels remain stable and whose current-item highlight changes correctly with the narrative position.
- Mini-directory labels remain semantically readable; no independent categories are hidden behind unexplained letters, combined codes, or overflow-driven abbreviations.
- A chapter-boundary scan finds no unrelated method, case, or conclusion leaking in from another chapter.
- Every explicitly requested parallel direction, category, or study receives enough detail for live recall; none was reduced to a label merely to save slides.
- Major study and method pages have a faithful one-sentence entry point, and later process pages do not duplicate incompatible versions of the same problem or approach.
- Each chapter passes content, source, notes, and visual checks on its own before the assembled deck is checked for global transitions and visual consistency.

## Content QA

- Every visible claim, title, number, label, example, and conclusion is attributable to a supplied or verified source.
- No unsupported experiments, work status, plans, recommendations, or conclusions were added.
- Titles reflect the source and do not exaggerate certainty.
- Source terminology, qualifications, units, and scope are preserved.
- Explanatory source sentences are not reduced to opaque keyword lists or `A + B + C` shorthand when the original describes how components interact.
- All required source sections are covered; omissions are deliberate and disclosed.
- The deck is not a deliberately skeletal or minimum-effort rendition: major requested topics include enough problem, approach, workflow, and meaning to support live explanation where the source provides them.
- No requested category, process, figure, notes script, or verification pass was omitted merely to reduce slide count or production cost.
- Each content slide has a precise visible `Source: ...` line.

## Notes QA

- Every slide has a complete multi-sentence script in PowerPoint Notes.
- The script is directly readable and explains purpose, key points, evidence, and transition.
- Each notes entry ends with a `[Sources]` block.
- No script residue or internal drafting instruction appears on the visible slide.

## Visual QA

- Check that the cover's right-side English keywords are fully uppercase, separated one per line, and not replaced by generic labels such as `ACADEMIC REPORT` or `PRESENTATION`.
- Check that the cover year-month remains anchored at bottom right and that `学术汇报` is visibly the uppermost text element.
- Render and inspect every slide at presentation size.
- Check for overflow, overlaps, occlusion, clipped text, awkward line breaks, unsafe image crops, and abnormal table wrapping.
- Check that title hierarchy, navigation, accent colors, margins, source footer, and page numbers are consistent.
- Check that sibling section pages use a coherent shared layout and that explanatory sidebars remain tied to the slide's primary content.
- Check that independently defined points were not merged for convenience, and that sibling subcategory pages consistently foreground research names and comparable key fields.
- Audit every arrow: its endpoints and adjacent prose describe the same transition, dependency, or information flow.
- Fail a page when an arrow is visually plausible but semantically disconnected from the text below it. Replace it with numbered stages, paired fields, a comparison, or plain prose according to the source relationship.
- Audit every paper section for sequence coherence: overview, key mechanism when necessary, training, inference, and comparison must appear in a deliberate order without component inventories interrupting the explanation.
- Confirm that sibling paper overview pages and sibling workflow pages use the same layout family, field order, figure scale, and title hierarchy unless a source-driven exception is documented.
- Confirm that reusable improvements were propagated backward to earlier instances of the same page type.
- Confirm newly derived page variants look native to the reference deck and were created because the content required them, not as an unrelated visual redesign.
- Confirm tables remain readable and footnotes are not detached from the data they qualify.
- Confirm image captions and sources remain associated with the correct image.
- Inspect hidden or off-canvas elements for unreplaced placeholders or source-specific residue.
- Run the presentation structural tests and the template-fidelity checker before delivery.
