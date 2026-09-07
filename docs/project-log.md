# Project Log

## 2026-09-08 — Resilient matcher slice

- Verified the worktree was clean and isolated; the separate `D:\workspace\pandaoffer` worktree contains user changes and was not modified.
- Fetched `origin/main` and created `codex/matcher-resilience` from the latest remote baseline.
- `web-sop doctor` could not run because the CLI is not installed; manually adopted the non-moving SOP contract and used project-native equivalent gates.
- Product review selected the AI-outage matcher dead end as the narrowest P0 conversion/trust blocker.
- Engineering review chose a pure local fallback, server validation, concurrent optional RAG queries, external-output validation, and a 12-second AI timeout.
- Browser discovery found the proxy constructed a Supabase client before the public homepage could render. The slice was extended within the same journey to pass public requests without configuration while keeping protected routes closed.
- Design review retained the existing system and specified loading, empty, error, success, partial, responsive, keyboard, focus, and live-region behavior.
- Mobile browser review found the absolute unlock overlay created a large empty scroll region. The locked mobile layout now uses a compact in-flow gate while desktop retains the preview overlay.
- Baseline: lint passed; build passed; default concurrent Vitest run hit Windows worker-start timeouts, while the isolated single-worker run passed 19/19 tests.
- Equivalent fast gate: 7 test files / 29 tests passed, ESLint passed, and Next.js production build passed. `web-sop check --mode fast` remained unavailable because the CLI is not installed.
- ESLint now precisely ignores only `public/tools/simulator/lib`, which contains vendored minified React, Babel, and Tailwind browser distributions that previously added minutes to lint without checking first-party source.
- Browser smoke: public homepage loaded without Supabase configuration; the no-AI STEM profile reached a labeled three-school fallback at 1280x800 and 390x844; mobile unlock layout was rechecked after repair.
- Secret/generated-output review: no credential material found; `.next` and `node_modules` remained ignored.
- Production dependency audit: the configured mirror lacked an audit endpoint; the official registry completed and reported six high-severity findings in existing `js-yaml`, `nanoid`, `next`, `postcss`, `sharp`, and `ws` dependency paths. No broad or forced upgrade was mixed into this slice.
- Final commit SHA, integration SHA, and remote SHA: pending completion.
