# Handoff

## Current slice

The homepage university matcher now has a curated-data fallback for absent or failing AI service, with server validation, response provenance, accessible partial/empty states, and regression coverage.

## Operator notes

- No new environment variable is required.
- `DEEPSEEK_KEY` remains optional enrichment.
- Run `npm run test:ci -- --pool=threads --maxWorkers=1` on this Windows host if the default Vitest fork pool times out.
- Production deployment is intentionally not part of this handoff.

Final commit, remote `main`, and gate evidence are recorded in `docs/project-log.md` after integration.
