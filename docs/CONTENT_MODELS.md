# Content models

Canonical TypeScript interfaces live in `src/domain/models.ts`; Zod publication schemas live in `src/server/repositories/content-validation.ts`; MySQL tables live in `src/server/db/schema.ts`.

## Public content

| Model | Purpose | Important safeguards |
|---|---|---|
| `SiteSettings` | Identity, history, founder, declaration, values, supplied vision/mission/objectives, beliefs, weekly rhythm, Scripture references, verified public details | Missing exact contacts and venue details fall back to useful contact actions, not invented data |
| `Ministry` | Department description, focus areas, image, optional leader/contact | Client-profile ministries are combined into clear public groupings; unknown contacts remain unset |
| `Leader` | Category, role, biography, assignments, portrait, approved links | The supplied founder is published; the CPMI emblem stands in for an approved portrait |
| `EditorialEntry` | News and stories with category, tags, body, status, SEO | `sample` visibly distinguishes demonstration editorial |
| `Devotional` | Editorial content plus Scripture references and related teachings | References are stored without unlicensed full translation text |
| `EventRecord` | Dates, timezone, venue/online URL, capacity, registration state | Illustrative future events use `sample` labels and do not enable registration |
| `MediaEpisode` | Audio/video episode, artwork, speaker/host, duration, references | Media URL and identities are optional and unpublished until verified |
| `MediaCollection` | Sermon series, podcast, or radio programme | Episodes are related by slug |
| `ScheduleSlot` | Day/time/timezone programme slot | A schedule never implies stream health |
| `Campaign` | Goal and server-derived verified amount | In database mode, confirmed settlements overwrite editorial totals |
| `GivingPurpose` | Allowed designation for manual giving | Payment instructions are a separate server setting |
| `GalleryItem` | Captioned image with alternative text | Temporary images are marked in metadata |

## Persistence tables

- `users`: administrator identity, bcrypt hash, role, active flag.
- `content_entries`: typed JSON payload, kind/slug identity, draft/review/published/archive lifecycle.
- `site_settings`: public/private key-value settings for future dedicated editors.
- `media_assets`: media metadata and ownership.
- `form_submissions`: contact, prayer, visit, and event registration records with private-pastoral and review fields.
- `donation_submissions`: donor reference, designation, amount, private evidence path, pending/confirmed/rejected review state.
- `payment_methods`: server-controlled approved manual instructions.

## Publication kinds

The generic content administration validates the selected kind before save: site settings, ministries, leaders, news, stories, devotionals, events, sermons, sermon series, podcasts and episodes, radio programmes and episodes, schedule slots, campaigns, giving purposes, and gallery items.

Database collections replace the matching demonstration collection only when published and valid. Invalid JSON never reaches a public page.
