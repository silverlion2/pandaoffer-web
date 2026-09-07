# Design System

## Matcher journey review

The existing PandaOffer visual language remains authoritative: slate surfaces and text, emerald actions and positive state, amber caution, Outfit headings, Inter UI copy, rounded controls, and restrained shadows.

### Information hierarchy

1. Profile task and primary submit action.
2. Progress status while the shortlist is built.
3. Result provenance and limitations.
4. Top match summary, detailed data, and two alternatives.
5. Existing sign-in/email unlock and downstream community actions.

### Interaction states

- Loading: polite live status with non-AI-specific “Building your university shortlist” copy.
- Empty: neutral explanation and “Adjust profile” recovery.
- Error: amber warning with retry and advisor route.
- Success: existing AI result presentation with `Analysis complete`.
- Partial: amber curated-data notice, `Curated shortlist ready`, planning-language scholarship label, and guarantee disclaimer.

### Responsive behavior

The established single-column mobile flow and desktop grids remain unchanged. New notices use wrapping flex layout, and primary recovery actions have at least 44px height. No fixed-width content is introduced.

On mobile, the locked-detail preview is hidden and the unlock card stays in normal document flow, avoiding empty scroll regions. Desktop retains the blurred preview with a centered unlock overlay.

### Accessibility

Form labels bind to controls; invalid controls expose `aria-invalid` and described errors; errors use `role=alert`; loading and fallback notices use polite live regions; retry actions have visible focus rings; decorative status icons are hidden from assistive technology where appropriate.

Image generation was intentionally skipped because this is a narrow state and reliability fix inside an existing design system, as allowed by the frontend implementation skill.
