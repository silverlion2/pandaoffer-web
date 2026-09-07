# Product Specification

## Product review: resilient university matching

### Problem reframe

The homepage promises a free university match, but the previous implementation returned a dead-end whenever the external AI credential or service was unavailable. A visitor who completed the form could not reach results or the existing lead-unlock journey.

### User truth

Prospective students need a credible shortlist they can act on immediately. They also need to know whether a result is AI-assisted or based on curated reference data, and that any percentage is guidance rather than an admission guarantee.

### Narrowest complete release

- Validate the profile again at the API trust boundary.
- Allow public pages to load without Supabase configuration while protected routes remain closed.
- Return three deterministic, major-relevant universities from the maintained local dataset when AI is unavailable or malformed.
- Keep AI results when the dependency is healthy and structurally usable.
- Label the fallback as partial guidance, preserve the existing unlock funnel, and provide empty/error recovery.

### Exclusions

- No new model, database, CRM, payment, or analytics credential.
- No change to pricing, authentication policy, lead capture policy, or university source content.
- No claim that the local score predicts admission.

### Success and stop conditions

- A valid profile reaches a three-university result with `DEEPSEEK_KEY` absent.
- The public homepage loads with Supabase configuration absent.
- Invalid profiles return HTTP 400.
- AI dependency failure does not interrupt the core journey while curated data is available.
- Loading, empty, error, success, and partial states remain recoverable and understandable.
- Stop and return an error if fewer than three major-relevant curated records are available; do not fabricate schools.

### Risks and metrics

The principal risk is over-trust in estimates, mitigated by provenance and guarantee disclaimers. Useful production metrics for a later consented analytics slice are matcher completion rate, fallback rate, unlock conversion, and retry rate; this slice adds no tracking dependency.
