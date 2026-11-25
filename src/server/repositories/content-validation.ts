import { z } from "zod";

const status = z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]);
const image = z.object({ src: z.string().min(1), alt: z.string().min(1), width: z.number().int().positive().optional(), height: z.number().int().positive().optional(), temporary: z.boolean().optional() });
const seo = { metaTitle: z.string().optional(), metaDescription: z.string().optional(), canonicalPath: z.string().optional() };

export const ministrySchema = z.object({ slug: z.string().min(1), name: z.string().min(1), summary: z.string().min(1), description: z.array(z.string()), focusAreas: z.array(z.string()), image, featured: z.boolean().optional(), leaderSlug: z.string().optional(), contactEmail: z.email().optional(), ...seo });
export const leaderSchema = z.object({ slug: z.string().min(1), name: z.string().min(1), role: z.string().min(1), category: z.string().min(1), biography: z.array(z.string()), assignments: z.array(z.string()), portrait: image, socialLinks: z.array(z.object({ label: z.string(), href: z.url() })).optional(), ...seo });
export const editorialSchema = z.object({ slug: z.string().min(1), title: z.string().min(1), excerpt: z.string().min(1), body: z.array(z.string()), category: z.string().min(1), tags: z.array(z.string()), publishedAt: z.string().optional(), author: z.string().optional(), status, image, sample: z.boolean().optional(), ...seo });
export const devotionalSchema = editorialSchema.extend({ scriptureReferences: z.array(z.string()), relatedSermonSlugs: z.array(z.string()) });
export const eventSchema = z.object({ slug: z.string().min(1), title: z.string().min(1), summary: z.string().min(1), description: z.array(z.string()), startsAt: z.string().datetime(), endsAt: z.string().datetime().optional(), timezone: z.string().min(1), venueName: z.string().optional(), venueAddress: z.string().optional(), onlineUrl: z.url().optional(), capacity: z.number().int().positive().optional(), registrationEnabled: z.boolean(), status, image, sample: z.boolean().optional(), ...seo });
export const episodeSchema = z.object({ slug: z.string().min(1), title: z.string().min(1), description: z.string().min(1), mediaType: z.enum(["AUDIO", "VIDEO"]), mediaUrl: z.url().optional(), audioUrl: z.url().optional(), artwork: image, durationSeconds: z.number().int().positive().optional(), publishedAt: z.string().optional(), speaker: z.string().optional(), host: z.string().optional(), scriptureReferences: z.array(z.string()), seriesSlug: z.string().optional(), programmeSlug: z.string().optional(), status, sample: z.boolean().optional(), ...seo });
export const collectionSchema = z.object({ slug: z.string().min(1), title: z.string().min(1), summary: z.string().min(1), description: z.array(z.string()), artwork: image, kind: z.enum(["SERMON_SERIES", "PODCAST", "RADIO_PROGRAMME"]), host: z.string().optional(), episodeSlugs: z.array(z.string()), status, sample: z.boolean().optional(), ...seo });
export const scheduleSchema = z.object({ id: z.string().min(1), programmeSlug: z.string().min(1), dayOfWeek: z.number().int().min(0).max(6), startsAtLocal: z.string().regex(/^\d{2}:\d{2}$/), endsAtLocal: z.string().regex(/^\d{2}:\d{2}$/), timezone: z.string().min(1), sample: z.boolean().optional() });
export const campaignSchema = z.object({ slug: z.string().min(1), title: z.string().min(1), summary: z.string().min(1), description: z.array(z.string()), category: z.string().min(1), goalMinor: z.number().int().positive().optional(), verifiedRaisedMinor: z.number().int().nonnegative(), currency: z.string().length(3), image, status, sample: z.boolean().optional(), ...seo });
export const givingPurposeSchema = z.object({ id: z.string().min(1), label: z.string().min(1), description: z.string().min(1), campaignSlug: z.string().optional() });
export const gallerySchema = z.object({ id: z.string().min(1), title: z.string().min(1), caption: z.string(), image });
export const siteSettingsSchema = z.object({
  organizationName: z.string().min(1),
  shortName: z.string().min(1),
  declaration: z.string().min(1).optional(),
  values: z.array(z.string().min(1)).optional(),
  foundedYear: z.number().int().positive().optional(),
  foundedIn: z.string().min(1).optional(),
  founderName: z.string().min(1).optional(),
  vision: z.string().min(1),
  mission: z.string().min(1),
  scriptureReference: z.string().min(1),
  missionScriptures: z.array(z.string().min(1)).optional(),
  beliefs: z.array(z.object({ title: z.string().min(1), summary: z.string().min(1), references: z.array(z.string().min(1)) })).optional(),
  weeklyRhythm: z.array(z.object({ day: z.string().min(1), title: z.string().min(1), summary: z.string().min(1), time: z.string().min(1).optional() })).optional(),
  objectives: z.array(z.string()),
  publicEmail: z.email().optional(),
  publicPhone: z.string().optional(),
  address: z.string().optional(),
  timezone: z.string().min(1),
  siteUrl: z.url(),
  socialLinks: z.array(z.object({ label: z.string(), href: z.url(), icon: z.string() })),
});
