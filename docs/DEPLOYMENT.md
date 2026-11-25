# Deployment

## Build

Use Node.js 24.14.1 or newer and install from the lockfile:

```powershell
npm.cmd ci
npm.cmd run verify
```

Deploy the generated Next.js application with `npm.cmd run start` behind an HTTPS reverse proxy. Do not expose XAMPP development services directly to the internet.

## Environment

Copy the names from `.env.example` into the platform's secret manager. Required for persistence/authentication:

- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

Add only verified stream, contact, hero, and giving values. Do not commit `.env.local`.

## Database

1. Back up the database.
2. Apply `npm.cmd run db:migrate` as a controlled release step.
3. Bootstrap the first administrator only once.
4. Verify least-privilege grants, encrypted connections where supported, automated backups, and restore drills.

## Storage

The current evidence store is local disk. Production must mount encrypted persistent storage at `storage/private`, keep it outside public web roots, include it in controlled backups, and enforce retention/deletion policy. Serverless read-only filesystems require replacing the storage service with private object storage before accepting evidence.

## Reverse proxy and security

- Redirect HTTP to HTTPS and set HSTS after confirming HTTPS operation.
- Preserve the client IP in trusted proxy headers for rate limiting.
- Add CSP/frame/source rules matching only configured stream and embed providers.
- Apply upload/body limits consistent with the application's 4 MB evidence limit.
- Replace in-process rate limiting with a shared store for multiple replicas.
- Monitor authentication failures, submission failures, stream errors, and database health without logging private message bodies or donor evidence.

## Release checks

- Run typecheck, ESLint, unit tests, production build, and browser tests.
- Load all sitemap routes and confirm custom 404 behavior.
- Test at 320, 390, 768, 1024, and 1440 pixels with no horizontal overflow.
- Test keyboard navigation, visible focus, reduced motion, forms, and mobile menu.
- Confirm final photography licences and replace all temporary assets.
- Verify radio/video sources from the production domain.
- Submit test forms into the production database and remove them afterward under the retention process.
- Review a test donation from pending to rejected/confirmed against a non-financial sandbox record; never use invented live payment credentials.
