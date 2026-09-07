# Test Matrix

| Journey/state | Expected behavior | Evidence |
|---|---|---|
| Loading | Submit transitions to a polite “Building your university shortlist” status | Browser core-flow check |
| Success | Valid, structurally complete AI response is returned with `meta.source=ai` | Route logic + production build |
| Partial: no credential | Valid profile returns three curated, major-relevant schools and provenance | `matcher.test.js` |
| Public availability | Homepage request passes through when Supabase configuration is absent | `proxy.test.js` |
| Protected boundary | Account/admin request redirects to login when Supabase configuration is absent | `proxy.test.js` |
| Partial: dependency failure | Network/timeout failure returns curated result | `matcher.test.js` |
| Empty | Result renderer with zero schools explains the gap and offers profile recovery | `matcher-results.test.jsx` |
| Error | No AI and insufficient curated records produce an explicit recoverable error | Manual boundary review |
| Validation | Out-of-range GPA returns HTTP 400 and form errors are associated with controls | `matcher.test.js`, `schema.test.js` |
| Duplicate submission | Submit is protected by the analyzing transition; result remains deterministic | Browser core-flow check |
| Partial fields | Nullable tuition renders without throwing; required AI shape is validated before use | Unit test + boundary review |
| Responsive | Form, notice, result, and unlock panel fit desktop and mobile widths | Browser screenshots |
| Keyboard/accessibility | Labels, focus indicators, live regions, and 44px actions are present | Component tests + browser inspection |
| Regression | Existing homepage, SEO, schema, and study-tour tests remain green | Full test suite |
