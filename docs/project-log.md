# Project Log

## 2026-09-09 — Duplicate worktree reconciliation

- Both delayed dependency-remediation setup receipts eventually materialized as clean worktrees without formal task handles. Compared them read-only before selecting a writer.
- Retained `C:\Users\T480S\.codex\worktrees\e43e\pandaoffer` on `codex/dependency-security-baseline` because it starts from the delivered matcher milestone, contains the full project governance/evidence update, and exactly matched `origin/main` at `c67423e` before this log entry.
- After project and portfolio records were current, removed the clean duplicate worktree `C:\Users\T480S\.codex\worktrees\bf58\pandaoffer`. Its commit `57fd10d` starts from stale baseline `2b3008e`; branch `codex/security-dependency-refresh` remains preserved for traceability, while only `e43e` remains as the delivery worktree.
- The Website SOP CLI is now available in this host. `web-sop doctor` completed with warn-mode findings for the current SOP version plus unconfigured standalone typecheck/E2E commands. `web-sop check --mode fast` passed lint, 7 files / 30 tests, and the Next.js 16.3.4 production build with 100 generated pages; type checking remains covered by the Next.js build.
- Fresh official-registry production-only and full `npm audit` runs both reported zero vulnerabilities. Lint retains three pre-existing internal-navigation warnings and no errors.
- No product code, dependency versions, provider configuration, credentials, deployment, payment flow, or external message changed during reconciliation.

## 2026-09-09 — Dependency security baseline

- Confirmed this Codex worktree was clean and isolated, fetched `origin/main`, and moved the detached worktree baseline from `2b3008e` to the latest remote commit `1e8933c`. The separate `D:\workspace\pandaoffer` checkout was not modified.
- Read the repository SOP contract. `.gemini` is not present, so the Session Manager workflow does not apply; this project log is the durable task record.
- `web-sop doctor` remained unavailable because the CLI is not installed. The configured project-native equivalent gates were used, matching the repository's manual SOP adoption record.
- The initial official-registry production audit reported six high-severity paths: `next`, its `postcss` and `sharp` dependencies, plus transitive `js-yaml`, `nanoid`, and `ws`.
- Upgraded `next`, `@next/third-parties`, and `eslint-config-next` from 16.1.6 to 16.3.4. Refreshed vulnerable transitive packages only within existing parent semver ranges; no dependency override, provider, credential, schema, API, or product behavior was added.
- Clean `npm ci` completed and the full official-registry audit reported zero vulnerabilities. The configured production-only audit also reported zero vulnerabilities.
- Equivalent fast gate: ESLint passed with zero errors and three pre-existing navigation warnings; 7 Vitest files / 30 tests passed with one single-worker cold-start timeout passing on isolated reproduction and the immediate full-suite rerun; Next.js 16.3.4 production build completed with 100 static pages.
- Browser smoke against the local production server: the homepage loaded, an India / Engineering / 85 profile returned a labeled three-school curated fallback without Supabase or AI credentials, the result unlock entry was visible, and `/account` redirected to `/auth/login?redirect=%2Faccount`.
- Codex Security diff scan `71de1876-d49a-4d20-806e-fa01c8116b30` completed with full declared coverage and no candidate or reportable findings. TAC status was `not_granted`, so protected report display may be unavailable; this did not gate the local review.
- Final `web-sop check --mode fast` could not start because the CLI remains unavailable. Its configured equivalents passed: lint (0 errors, 3 existing navigation warnings), 30/30 tests, production build with 100 static pages, production audit 0 vulnerabilities, and full audit 0 vulnerabilities.
- Production deployment, cloud configuration, credentials, payments, and external messages remained out of scope and unchanged.

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
- Equivalent fast gate after the final remote fetch: 7 test files / 30 tests passed, ESLint passed, and Next.js production build passed with its built-in type check and 100 static pages. `web-sop check --mode fast` remained unavailable because the CLI is not installed.
- ESLint now precisely ignores only `public/tools/simulator/lib`, which contains vendored minified React, Babel, and Tailwind browser distributions that previously added minutes to lint without checking first-party source.
- Browser smoke: public homepage loaded without Supabase configuration; the no-AI STEM profile reached a labeled three-school fallback at 1280x800 and 390x844; mobile unlock layout was rechecked after repair.
- Secret/generated-output review: no credential material found; `.next` and `node_modules` remained ignored.
- Production dependency audit: the configured mirror lacked an audit endpoint; the official registry completed and reported six high-severity findings in existing `js-yaml`, `nanoid`, `next`, `postcss`, `sharp`, and `ws` dependency paths. No broad or forced upgrade was mixed into this slice.
- Implementation commit: `49a7e81` (`Make university matching resilient without credentials`).
- Integration check: `origin/main` remained `af7e725`; the implementation branch was one commit ahead and zero behind, so no merge or rebase was required.
- Evidence commit and final remote SHA: completed during push handoff and reported in the task result.

## 2026-11-06 — matcher and automated browser reliability candidate

See [implementation and validation record](matcher-browser-quality-2026-11-06.md). Isolated from current remote main, with original owner changes retained. Adds request ownership and shared response validation, bounded optional retrieval, storage-denial recovery, account draft preservation, supported city/major route segments and an isolated CI browser gate. Dependency audit reduced from 17 entries (including one critical) to zero against the official registry. Final local/CI evidence is recorded with the candidate; no production release or real service writes.
