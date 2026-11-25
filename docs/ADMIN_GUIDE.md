# Administration guide

## Bootstrap

1. Configure MySQL and run `npm.cmd run db:migrate`.
2. Generate a bcrypt hash outside source control.
3. Temporarily set `ADMIN_BOOTSTRAP_EMAIL`, `ADMIN_BOOTSTRAP_PASSWORD_HASH`, and `ADMIN_BOOTSTRAP_ROLE`.
4. Run `npm.cmd run db:seed`.
5. Remove the bootstrap variables and restart the application.

There are no default credentials. `/admin/login` remains non-functional in demonstration mode by design.

## Roles

| Role | Access |
|---|---|
| `CONTENT_EDITOR` | Content entries and publication lifecycle |
| `MINISTRY_ADMIN` | Content plus operational form submissions |
| `FINANCE_REVIEWER` | Donation history and settlement review |
| `SUPER_ADMIN` | All areas |

Permissions are checked on both pages and API mutations; hiding a menu item is not the security boundary.

## Content workflow

Entries have `DRAFT`, `REVIEW`, `PUBLISHED`, or `ARCHIVED` status. Select the correct type, provide a lowercase hyphenated slug, and edit the typed JSON payload. The server validates the entire payload for that type before save. Published, valid entries are available through the public repository immediately.

Use `temporary: true` on unapproved images and meaningful alternative text. Never publish unknown leaders, dates, addresses, schedules, impact totals, payment details, or media identities as fact.

## Submissions

Contact, visit, event, and prayer submissions are operational records. Prayer records carry the private-pastoral flag and must be limited to authorised pastoral personnel in any expanded workflow. Apply an approved retention/deletion policy before production.

## Donations

Finance review is separate from ordinary content administration. Confirm only against actual settlement evidence. The table includes pending, confirmed, and rejected records for reporting. A rejection requires a reason.

## Operational checklist

The dashboard reports database, stream, live video, giving, and public-contact configuration. A green/configured state means a value is present, not that an external provider has passed end-to-end production testing.
