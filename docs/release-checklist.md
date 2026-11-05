# Release Checklist

- Release type: implementation handoff; production deployment is not authorized.
- Owner: PandaOffer maintainers.
- Build evidence: record lint, tests, build, audit, browser smoke, and secret/generated-output review in `docs/project-log.md`.
- Deployment target: existing Vercel project, unchanged.
- Production smoke: not run because deployment is out of scope.
- Security status: Next.js and aligned packages are pinned to 16.4.5; production-only and full dependency audits report zero known vulnerabilities against the official npm advisory endpoint.
- Monitoring: inspect matcher server errors and, when available, privacy-safe fallback/completion rates.
- Rollback: revert the security-baseline commit to restore the previous lockfile. If the matcher itself must also be rolled back, revert the resilient-matcher commit separately.

- November 6 candidate: see `matcher-browser-quality-2026-11-06.md` for scope, dependency rationale and current validation. Revert this candidate commit to restore prior code/lock/CI; no production data migration is involved.
- CI requires lint, unit/consumer tests, full official dependency audit, runner failure checks and credential-free production browser tests before review.
- Standalone typecheck is not configured in this JavaScript repository; production Next build retains its native checks. No real-device or production acceptance is implied by local/CI success.
