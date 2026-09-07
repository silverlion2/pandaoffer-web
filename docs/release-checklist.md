# Release Checklist

- Release type: implementation handoff; production deployment is not authorized.
- Owner: PandaOffer maintainers.
- Build evidence: record lint, tests, build, audit, browser smoke, and secret/generated-output review in `docs/project-log.md`.
- Deployment target: existing Vercel project, unchanged.
- Production smoke: not run because deployment is out of scope.
- Security status: production dependency audit currently reports six high-severity findings in existing dependencies; a dedicated upgrade is required before treating this as a production release candidate.
- Monitoring: inspect matcher server errors and, when available, privacy-safe fallback/completion rates.
- Rollback: revert the resilient-matcher commit and redeploy the prior remote `main` revision.
