# Christian Power Ministries International digital ministry

A production-oriented Next.js application for Christian Power Ministries International (CPMI), professionally adapted from the licensed Danbox template. The project preserves Danbox's Bootstrap, icon, animation, page-banner, card, slider, header, footer, and responsive patterns while adding typed ministry content, streaming, protected forms, manual giving, MySQL persistence, and a role-aware administration area.

## Requirements

- Node.js 24.14.1 or newer
- npm
- MySQL 8+ for persistent content, accounts, forms, and donation review

## Start locally

```powershell
Copy-Item .env.example .env.local
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000`. With `DATABASE_URL` left blank, public pages operate in a deterministic read-only demonstration mode. The client-supplied ministry story, founder, Sunday gathering, ministries, beliefs and community work remain available; illustrative events and media carry visible preview labels. Forms explicitly report when persistence is unavailable, authentication cannot succeed, and no payment detail or donation settlement is invented.

For a persistent installation:

1. Create an empty MySQL database and a least-privilege application user.
2. Set `DATABASE_URL`, `NEXTAUTH_URL`, and a random `NEXTAUTH_SECRET` in `.env.local`.
3. Generate a bcrypt password hash and set the one-time `ADMIN_BOOTSTRAP_*` values.
4. Run `npm.cmd run db:migrate` and then `npm.cmd run db:seed` once.
5. Remove the bootstrap variables after the administrator is created.

The seed script refuses to create a public default account and requires an explicit bcrypt hash.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run test
npm.cmd run build
npm.cmd run test:e2e
```

`npm.cmd run verify` runs the first four commands together. Browser tests use the locally installed Chrome channel configured in `playwright.config.ts`.

## Important configuration

- Streams and live video remain offline until verified URLs are supplied.
- Giving stops before transfer confirmation until approved instructions are supplied.
- The client profile supplies Pastor Stephen Kabuye, the 2014 Johannesburg origin and Sunday Kingdom Citizens Celebration from 9:00am–12:00pm. The exact venue, weekday times, contacts, social links and production media still require approval or configuration.
- Donation evidence is private and stored under `storage/private/donation-evidence`; this directory must never be served by the web server.
- Generated logo, favicon, radio artwork and temporary commissioned imagery are under `public/assets/img/brand/cpmi/` and can be replaced or refined by the ministry.

See [Implementation status](docs/IMPLEMENTATION_STATUS.md), [Deployment](docs/DEPLOYMENT.md), and [Danbox source mapping](docs/DANBOX_SOURCE_MAPPING.md) for the complete handoff.

## Project boundaries

- `src/app`: public, admin, and API routes
- `src/components`: Danbox-derived presentation plus CPMI interaction components
- `src/domain`: framework-independent content and finance models
- `src/server`: authentication, database, repositories, validation, services, and security
- `drizzle`: versioned MySQL migrations
- `tests`: unit and browser journeys
- `docs`: architecture and operator documentation

The purchased source in `C:\xampp\htdocs\danbox-template\package\danbox` is not imported at runtime and was not modified. This application is self-contained.
