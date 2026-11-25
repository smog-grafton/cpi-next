# Danbox source mapping

The licensed source at `C:\xampp\htdocs\danbox-template\package\danbox` was treated as read-only. Paths below are relative to its `src` directory. Adapted copies live entirely in this project.

## Template audit

Danbox contains four home compositions (`app/page.tsx`, `app/index-2/page.tsx`, `app/index-3/page.tsx`, and `app/index-4/page.tsx`), four header/footer variants, and dedicated About, Causes, Donation, Events, FAQ, News, Team, and Contact layouts. The fourth home was selected because `HeroSlider4`, `Promo3`, `About4`, `Donation1/2`, `Gallery2`, `Volunter`, and `News4` provide the strongest ministry-oriented editorial rhythm. Header/Footer 4 supply the principal chrome.

The source uses Bootstrap, Swiper, WOW, Magnific Popup-inspired overlays, Font Awesome, CSS variables, responsive breakpoints, and a template utility layer. These systems remain the visual foundation. New functionality was inserted into Danbox structures instead of replacing them with another design system.

## Route and component mapping

| CPMI area | Danbox foundation | Adaptation |
|---|---|---|
| Global header/navigation | `layout/Header.tsx` variant 4 | CPMI wordmark, desktop dropdowns, mobile accordion navigation, search, sticky behavior, verified contact values |
| Footer | `layout/Footer.tsx` variant 4 | CPMI route groups, Scripture statement, conditional contact/social data, legal links |
| Homepage hero | `components/HeroSlider.tsx` / `HeroSlider4` | CPMI editorial slides, optional configured video, generated poster, Watch/Visit actions, preserved Swiper fade animation |
| Broadcast gateway | `components/Promo.tsx` / `Promo3` | Persistent radio control and truthful live-video status |
| Vision/mission | `components/About.tsx` / `About4` | Supplied official vision, mission, Matthew 11:28 reference, Danbox split-image composition |
| Ministries | `components/Donation.tsx`, `components/Service.tsx` | Typed ministry cards and detail routes using Danbox image/card/hover treatments |
| Teaching/media feature | `components/Feature.tsx`, `components/Causes.tsx` | Sermon and collection presentation with honest empty state when no approved media exists |
| Faith in action/gallery | `components/Gallery.tsx` / `Gallery2` | Typed gallery, lightbox-compatible imagery, temporary media labels in content metadata |
| Giving feature | `components/Donation.tsx` / `Donation2` | Manual giving explanation and verification safeguards |
| Events/news feature | `components/Event.tsx`, `components/News.tsx` / `News4` | Typed event/editorial cards with approved/sample distinctions |
| About routes | `app/about/page.tsx`, `components/About.tsx`, `components/Faq.tsx`, `components/Gallery.tsx` | Vision, objectives, beliefs-style disclosure, leadership truth states |
| Leadership routes | `app/team/page.tsx`, `app/team-details/page.tsx`, `components/Team.tsx`, `components/Volunter.tsx` | Typed categories/profile model; no invented people |
| Ministry routes | `app/causes/page.tsx`, `app/causes-details/page.tsx`, `components/Service.tsx` | Listing/detail editorial layouts without fabricated metrics |
| News/stories/devotionals | `app/news/page.tsx`, `app/news-grid/page.tsx`, `app/news-details/page.tsx`, `components/News.tsx`, `BlogSidebar.tsx` | Shared typed editorial detail/card system, metadata, related content, sample markers |
| Events | `app/events/page.tsx`, `app/event-details/page.tsx`, `components/Event.tsx` | Upcoming/past state, registration form, optional venue/online/capacity, calendar export |
| Giving/campaigns | `app/causes-details/page.tsx`, `app/donation-details/page.tsx`, `components/Causes.tsx`, `components/Donate.tsx` | Four-step manual contribution flow, private evidence, pending-first records, finance review |
| Contact/prayer/visit | `app/contact/page.tsx`, `components/Contact.tsx`, `components/Faq.tsx` | Accessible validated forms, honeypots, rate limits, privacy copy, multi-step visit flow |
| Internal banners | `components/PageBanner.tsx` | Route-specific title and breadcrumb data |
| Image/video overlays | `components/ImageView.tsx`, `components/VideoPopup.tsx` | Shared runtime overlays plus safe configured media player |
| Loading transition | Danbox preloader structure and curtain panels | CPMI mark, reduced-motion timing, four-panel curtain exit |
| Scroll reveals | `utility/index.ts`, WOW classes throughout template | Typed dynamic WOW initialization and reduced-motion CSS |
| Radio/live/watch/sermons/podcasts | No complete Danbox equivalent | New functionality composed with Danbox cards, buttons, typography, banners, empty states, and media proportions |
| Search | Danbox header search overlay | Unified typed search across public content kinds |
| Administration | No Danbox equivalent | New protected operational UI styled with CPMI/Danbox tokens; intentionally separated from public template chrome |

## Fidelity decisions

- Danbox stylesheets remain loaded in their original dependency order; `src/app/globals.css` contains scoped brand refinements and new functional states.
- Existing template class names are retained on heroes, cards, banners, progress bars, galleries, buttons, and section wrappers.
- The fourth home composition remains recognisable, but charity claims and demo identities were replaced by ministry content or explicit unavailable states.
- The original template directory has no runtime dependency and was not edited.
