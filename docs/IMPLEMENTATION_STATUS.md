# Implementation status

Status recorded after the implementation and local verification pass.

## Implemented

- Complete App Router route set requested by the directive, including custom error/not-found, sitemap, robots, legal, search, calendar export, and route-specific metadata.
- Danbox Home 4-derived homepage, Header/Footer 4-derived chrome, page banners, cards, galleries, progress treatments, sliders, preloader, WOW reveals, responsive navigation, and template stylesheet stack.
- CPMI brand tokens and generated logo, favicon, radio artwork, hero and outreach imagery under `public/assets/img/brand/cpmi`.
- Client-profile reconciliation: corrected CPMI/Christian Power Ministries International naming, removed the unrelated Miracle Centre identity, and added the supplied 2014 Johannesburg origin, founder, vision, mission, values, beliefs, ministries, weekly rhythm, Sunday gathering and community-development work.
- Typed repositories and public content models with deterministic, truthful demonstration mode.
- Persistent global radio state, HTML audio, native/Hls.js source handling, fallback, retry, mute, volume, loading/error/unconfigured states, responsive always-present dock, and a focused listening console that replaces the dock on `/radio`.
- HLS/native video and allowlisted embed handling with offline/recorded-content fallbacks.
- Sermon, podcast, programme, schedule, live, Watch, news, story, event, devotional, gallery, Scripture reference, ministry, leadership, and campaign experiences with honest empty states.
- Validated contact, private prayer, visit, event registration, and manual donation APIs with rate limits and honeypots.
- Four-step donation workflow, approved-instruction gate, private file validation, pending-first records, finance-only confirmation/rejection, and confirmed-only campaign aggregation.
- Drizzle/MySQL schema, migration, explicit bootstrap seed, content repository overlay, and demonstration fallback.
- NextAuth credentials, protected admin layout, server-side role checks, content lifecycle editor, submission review visibility, donation history/review, and system configuration status.
- Strict TypeScript, ESLint, Vitest unit tests, and Playwright functional journeys.
- The installed dependency tree reports zero known npm audit vulnerabilities; migration SQL is checked in and applied by the small MySQL runner, avoiding a vulnerable development-only migration CLI dependency.

## Awaiting verified external configuration

- Approved portrait for Pastor Stephen Kabuye; additional leaders; ministry contacts; exact Johannesburg venue; weekday gathering times; events; social links; and approved production editorial/media content.
- Production radio stream and fallback URL.
- Production HLS or approved live-video embed URL.
- Approved manual giving method and account instructions.
- Production MySQL connection, administrator account, secret management, backup policy, SMTP/notification integration, and retention policy.
- Final ministry photography, final approved logo artwork, and final social/Open Graph creative.

Illustrative events, teachings, programmes and campaigns are visibly marked as previews; operational claims and financial totals remain conservative until verified.

## Deliberate operational limitations

- Rate limiting is in process; a multi-instance deployment needs a shared store.
- Media asset metadata exists, but this version does not expose a public file library/uploader. Editors may reference approved paths/URLs in typed JSON; donation evidence has its own private upload flow.
- Site structure and branding are code/environment controlled. The generic content editor supports typed site settings and content, but there is no drag-and-drop homepage-section or navigation builder.
- Event recurrence is represented by publishable event records rather than an RFC recurrence-rule editor.
- Search returns up to 30 ranked-by-source results. Current verified/demo collections are small enough that listing pagination is not displayed; the repository boundary is ready for cursor pagination when real volume requires it.
- The application does not send email/SMS notifications because no verified provider credentials were supplied.
- Payment gateways, card capture, and automatic settlement are intentionally absent.

## Verification assumptions

- MySQL-backed writes and account bootstrap require a locally available MySQL instance and were implemented against the checked-in migration; they must be exercised in the deployment environment with its own database and backup policy.
- Stream health can only be confirmed after real sources are supplied and CORS/TLS behavior is tested from the production domain.
- Bible full text is not included; only supplied references are indexed.
- Bundled Danbox assets remain temporary where explicitly identified. Replace them before final public launch as appropriate for the purchased licence and ministry approvals.
