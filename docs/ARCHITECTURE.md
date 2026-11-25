# Architecture

## Runtime shape

The App Router root layout owns `MediaProvider`, so the audio element and stream state survive client-side page transitions. Public pages use the `(site)` layout for Danbox-derived chrome. The `/admin` route group has a separate protected shell.

```text
Browser
  -> Next.js App Router
     -> public Server Components -> content repository -> MySQL or demo snapshot
     -> client interactions      -> validated API routes -> application services -> MySQL
     -> persistent media context -> remote audio/HLS source
     -> admin Server Components  -> NextAuth session + role checks -> services -> MySQL
```

## Boundaries

- `src/domain`: portable models and pure finance logic. It has no Next.js or database dependency.
- `src/content`: deterministic demonstration content. Supplied CPMI facts are present; unknown operational facts remain empty.
- `src/server/repositories`: public read model. Published database entries replace the matching demonstration collection after Zod validation.
- `src/server/services`: persistence workflows for content, private forms, donation evidence, and review.
- `src/server/validation`: request and content payload schemas.
- `src/server/db`: Drizzle schema and lazy MySQL connection.
- `src/components`: reusable Danbox-derived and functional UI.
- `src/app/api`: thin HTTP boundaries that rate-limit, validate, authorize, call services, and return explicit states.

## Data-source replacement

Pages consume typed repository functions rather than Drizzle directly. A future Laravel/Filament API can replace `content-repository.ts` and submission services while preserving domain models and view components.

## Rendering and caching

Content pages are Server Components. Interactive forms, menus, players, and multi-step workflows are focused client components. Donation status, admin screens, forms, and media health are runtime state and are not treated as immutable static facts. Environment-backed operational settings are read server-side.

## Security model

- NextAuth credential sessions use signed JWTs with an eight-hour maximum age.
- Database accounts are active/inactive and carry one role.
- Every protected API route performs a server-side role check.
- Roles: `CONTENT_EDITOR`, `FINANCE_REVIEWER`, `MINISTRY_ADMIN`, `SUPER_ADMIN`.
- Prayer payloads are stored as private pastoral submissions and never exposed publicly.
- Donation evidence accepts only JPG, PNG, or PDF up to 4 MB and is placed outside `public`.
- Public forms use strict Zod schemas, honeypots, and per-IP in-process rate limiting.

For multi-instance production, replace the in-memory rate limiter with a shared Redis or managed edge-rate-limit store.
