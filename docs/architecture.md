# Architecture

## Components

- `AiMatcherForm`: accessible profile collection and client validation.
- `proxy`: public-route pass-through without Supabase configuration and fail-closed handling for protected routes.
- `HomeClientManager`: request orchestration and loading/result transition.
- `app/api/matcher`: server validation, optional knowledge lookup, AI call, output validation, and failover.
- `lib/matcher`: pure GPA normalization and deterministic curated-data matching.
- `data/universities`: source-controlled university facts used by pages and fallback matching.
- `UnlockResults`: success, partial, empty, and error presentation plus the existing unlock flow.

## Data flow

```text
visitor form
  -> client schema validation
  -> POST /api/matcher
  -> server schema validation
  -> build local fallback from curated repository data
  -> optional Supabase context + DeepSeek request
  -> validate AI response
  -> AI result or labeled local fallback
  -> result UI -> existing sign-in/email unlock
```

Before this flow, the proxy checks whether Supabase URL and anonymous key are both configured. When either is absent, public requests pass through without constructing an SDK client; `/account` and `/admin` continue to redirect to login.

Independent Supabase knowledge queries run concurrently. The local result is prepared before the external call so missing credentials, timeouts, non-2xx responses, malformed JSON, and structurally incomplete AI responses can recover without another request.

## Trust boundaries and authorization

The browser payload and external AI response are untrusted. The API validates GPA ranges and caps text fields before any optional external call, then accepts AI output only when it contains exactly three minimally usable university records. Environment credentials remain server-side. The public matcher performs no privileged mutation; existing result-history and lead writes retain their current authenticated/best-effort boundaries.

## Failure, retry, and data-loss behavior

- Invalid profile: HTTP 400; client-side validation normally prevents submission.
- Supabase missing/failing: continue without RAG context.
- Supabase configuration missing at the proxy: public pages pass; protected pages remain closed.
- AI missing, timeout, non-2xx, invalid JSON, or unusable shape: return curated partial result.
- Curated dataset cannot produce three relevant records: explicit matcher error and profile retry.
- No matcher path writes user input, so failover creates no data-loss risk.

## Observability and rollback

Existing server error logs distinguish knowledge lookup, AI HTTP, AI JSON, and route failures without logging credentials. `meta.source` distinguishes `ai` from `curated-local` for future privacy-safe aggregation. Rollback is one commit: revert the resilient-matcher commit to restore the prior AI-only route and result UI.

## Architecture decision

See `docs/adr/0001-resilient-local-matcher.md`. This adds a pure local decision service but does not change framework, persistence, authentication, deployment, or dependencies.

## Dependency security baseline

The application, lint configuration, and third-party integration package are kept on the same Next.js patch line. The September 2026 security baseline is Next.js 16.3.4 with `@next/third-parties` and `eslint-config-next` 16.3.4. This retains the App Router, React 19.2, proxy, authentication, persistence, and deployment architecture while picking up framework fixes for request handling, Server Components, proxy authorization bypasses, cache behavior, image optimization, and bundled image/CSS processing.

Transitive packages remain governed by their existing parent dependency ranges rather than repository-level overrides. The lockfile pins patched `js-yaml`, `nanoid`, `ws`, PostCSS, Sharp, and development-tooling versions, and CI must continue to install with `npm ci`. Audit evidence is produced against the official npm advisory endpoint because the configured npm mirror does not implement the audit API.

## November 6 reliability boundary

`matcher-response.js` validates client/server result shapes without bundling the university catalog. The client owns one attempt, abort signal and timer; cancellation/unmount invalidates late results. The route skips optional reference storage without AI credentials, limits reference retrieval to three seconds and retains the existing 12-second AI deadline and curated fallback. City and major guides use complete dynamic segments with rewrites preserving existing public/canonical URLs. The browser runner uses a clean environment, fresh build and owned loopback server; artifacts live outside the checkout.
