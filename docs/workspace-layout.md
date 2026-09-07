# Workspace Layout

- `src/app`: Next.js App Router pages, route handlers, and server actions.
- `src/components`: client and server UI components organized by feature.
- `src/lib`: shared validation, Supabase clients, markdown, schema, and matcher logic.
- `src/data`: source-controlled product datasets.
- `src/__tests__`: Vitest component, route, schema, and content checks.
- `public`: static images, brochures, and simulator distribution.
- `supabase/migrations`: persistence migrations.
- `docs`: product, architecture, design, test, release, roadmap, and handoff decisions.
- `.sop`: website SOP adoption metadata.

The existing framework layout is preserved; no source files were moved during SOP adoption.
The vendored browser distributions under `public/tools/simulator/lib` are runtime artifacts and are intentionally excluded from ESLint; first-party simulator source remains reviewable.
