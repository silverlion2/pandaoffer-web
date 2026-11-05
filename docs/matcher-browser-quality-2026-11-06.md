# Matcher browser quality and dependency refresh — 2026-11-06

## Product review

The flow under test is: homepage -> enter a synthetic student profile -> submit -> a clearly labeled curated shortlist or recoverable error -> edit profile and retry. A result must belong to the submitted profile; a failed second request must never reuse the previous shortlist under new details. Pending work must be cancellable and bounded, and returning responses must not overwrite a newer attempt. Browser storage denial must not blank the public experience. Estimates remain guidance, and no factual university, scholarship, visa, payment or lead-capture policy is changed.

## Engineering review

Start from actual main `2bf612e`, preserving the original dirty D-drive checkout and its older open PR. Reuse the existing server fallback and unit coverage. Add component regressions before fixing stale results, and bound optional reference retrieval so an absent AI credential never waits for a database. Refresh Next/ESLint/third-parties together within major 16 and compatible transitive patches; inspect actual audit results rather than downgrade to the audit tool's suggested older major. Any scoped major override needs a consumer regression. Verify mirror tarball integrity against official metadata before normalizing URLs.

Add a repository-owned Playwright production gate with an exact loopback origin, clean credential-free build environment, external HTTP/WebSocket guards, generated profiles and no real login/lead/payment writes. Keep reports/screenshots/traces outside the repository, including CI artifacts. Refuse occupied ports and always close the owned preview. Browser plugin not available; use regular Playwright under the frontend-testing-debugging workflow. Existing CI will run the native gate automatically.

## Design review

Keep the existing design language and form labels. Preserve entered values when editing or retrying; make analyzing state cancellable with accurate progress copy. Distinguish partial curated guidance, empty results, transport errors and malformed responses. Verify first viewport, desktop/390px flow, focus, touch targets, console health, no overlays/overflow, and actual screenshots. Do not count a build or historical smoke report as browser acceptance.

## Initial evidence

Doctor: outdated SOP numeric version, no standalone typecheck, no E2E. The JavaScript project keeps build-based checking; no forced TypeScript migration. Official audit reports 17 entries: 10 moderate, 6 high, 1 critical. Current lock has 526 mirror URLs and 134 official URLs. Source inspection identifies a retained `matchResults` value when a later request fails; test reproduction is next. Baseline installation completed without changing the lock.

## Implementation and discovered issues

The three baseline component regressions all failed: stale result reuse, missing cancellation, and a malformed object crashing React. Attempts now clear old results, own their AbortController/deadline, ignore late responses and abort on unmount. Shared response validation stays separate from the university catalog. Optional reference retrieval is skipped without AI credentials and bounded to three seconds otherwise. Browser storage is best-effort.

The production browser gate found four footer city links returning 404 because `study-in-[city]` is not a dynamic App Router segment. The existing page is now at `study-in/[city]` with a rewrite preserving the public `/study-in-<city>` URLs and canonical metadata. Existing guide text and data are unchanged. The first browser run also used an incorrect `/dashboard` test URL; it now exercises the actual `/account` protected boundary. Failures are retained in external evidence.

The refreshed ESLint surfaced account profile state copied in an effect. The form now derives server defaults and keeps unsaved drafts owned by user ID; delayed profile loading, refresh and account switching have a component regression. The old PDF button only displayed a success toast without producing or mailing a PDF; it was removed. No PDF delivery or lead submission is claimed. Matching copy now distinguishes guidance from guarantees and no longer claims that unavailable external verification is running.

Screenshot review revealed that replacing a long home page could leave the viewport at the footer. Step changes now move focus and scroll to the matching flow; browser assertions require pending/error actions to be in the viewport.

## Dependency decisions

Next, third-parties and eslint-config-next move together to 16.4.5. Compatible updates clear critical/high advisories; the remaining minimatch advisory requires the scoped `minimatch@10` -> `11.0.4` override. A real TypeScript ESLint project-service test covers accepted dotfile globs and rejected nonmatching patterns. Legacy minimatch consumers retain their own major. The npm official registry resolved all tarballs during the update; the subsequent mirror normalizer found zero remaining mirror URLs and changed no versions or integrity values. No forced framework downgrade was used.

## Automated validation boundary

The runner refuses occupied port 4177 and root dotenv files, passes only an OS/runtime environment allowlist to build/preview/tests, and requires artifacts outside the checkout. It owns a fresh production build and loopback preview, then closes its child processes on completion/failure. Playwright blocks external HTTP and WebSocket traffic and forbids local mutations other than the synthetic matcher request. Browser tests never submit a valid lead, authenticate, pay or write to Supabase. External decorative requests receive empty responses; these tests do not validate external assets/services.

Current observed intermediate result: lint passes with three existing navigation warnings; 53 unit/component/consumer tests pass; 18 Chromium cases pass across 1280x900 and 390x844. Final checks after focus/scroll and runner changes are recorded below when complete. Browser plugin is unavailable in this session; regular Playwright is the fallback specified by frontend-testing-debugging.

Production deployment, real AI/Supabase/account writes, real mobile devices and Safari remain untested. University/visa/scholarship facts were not refreshed or certified by this engineering slice. The retained original D-drive checkout and old PR are unchanged.

The sibling `study-[major]-in-china` route has the same unsupported segment pattern and is listed by the sitemap. It is moved to `study/[major]` with its public URL preserved by rewrite. The browser gate checks every city/major URL from the generated sitemap plus an actual major-page navigation; unknown slugs must still return 404.

Final lifecycle review reproduced an asynchronous form-validation callback starting a request after unmount. A mounted guard now blocks it; the failing reproduction is retained in external logs. The small-screen pending caption now wraps naturally rather than being clipped by an animated fixed-height strip.

## Final local validation

Fresh official-registry `npm ci` succeeded. Frozen implementation: 55 unit/component/consumer tests pass, lint passes with three existing navigation warnings, production build passes, SOP fast and release exit zero. Standalone typecheck is explicitly skipped in this JavaScript project. The release gate runs 20 Chromium cases without retries (29.6 seconds), covering desktop/mobile and all sitemap city/major URLs; the owned preview reports `previewClosed: true`. Four runner isolation/failure checks pass. Full and production-only official audits report zero known advisories. All 653 resolved package tarball URLs point to the official registry. Desktop error/results and mobile pending/results screenshots were inspected; the active flow is visible and the loading caption wraps.

Remaining toolchain notices: existing Vite config-loader format, ESLint 9 support notice, Next Edge runtime deprecation and three internal-navigation lint warnings. These are not silently treated as production acceptance. CI results are attached to the draft PR after pushing the reviewed exact commit; production and real-service/device acceptance remain separate.
