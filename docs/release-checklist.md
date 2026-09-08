# Release Checklist

- Release type: implementation handoff; production deployment is not authorized.
- Owner: PandaOffer maintainers.
- Build evidence: record lint, tests, build, audit, browser smoke, and secret/generated-output review in `docs/project-log.md`.
- Deployment target: existing Vercel project, unchanged.
- Production smoke: not run because deployment is out of scope.
- Security status: Next.js and aligned packages are pinned to 16.3.4; production-only and full dependency audits report zero known vulnerabilities against the official npm advisory endpoint.
- Monitoring: inspect matcher server errors and, when available, privacy-safe fallback/completion rates.
- Rollback: revert the security-baseline commit to restore the previous lockfile. If the matcher itself must also be rolled back, revert the resilient-matcher commit separately.
