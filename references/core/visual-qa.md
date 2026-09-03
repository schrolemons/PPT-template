# Core Contract: Visual Language and QA

## Visual language

- Use `assets/reference.pptx` as the authority for typography, palette, spacing rhythm, margins, navigation treatment, source footer, page numbering, and overall visual character.
- Keep body text, labels, tables, and captions readable at presentation size. When content exceeds a frame, split the slide and restore readable explanatory sentences instead of shrinking type or crowding cards.
- Give source figures enough space for important labels and structure to remain legible. Enlarge, crop safely, or split a figure and its explanation when needed; never preserve an unreadable thumbnail merely to fit more prose.
- Use arrows only for a source-supported transition, transformation, dependency, or information flow. The endpoints, arrow label, and adjacent explanation must state the same relation; otherwise use numbered stages, paired fields, a table, or prose.

## Required QA

1. Render every slide at full presentation size and inspect the complete deck, not only a montage or editor view.
2. Check overflow, overlap, occlusion, clipping, awkward line breaks, unsafe crops, detached captions or footnotes, abnormal table wrapping, off-canvas residue, and unreplaced placeholders.
3. Check template fidelity for title hierarchy, typography, palette, margins, navigation, source footer, page numbers, and sibling-page consistency.
4. Check figure legibility and arrow semantics at element level.
5. Re-run module-level and whole-deck structural, overflow, rendering, and fidelity checks after every split or navigation-page update.
