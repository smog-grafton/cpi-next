import { z } from "zod";
import {
  campaignSchema, collectionSchema, devotionalSchema, editorialSchema, episodeSchema,
  eventSchema, gallerySchema, givingPurposeSchema, leaderSchema, ministrySchema,
  scheduleSchema, siteSettingsSchema,
} from "@/server/repositories/content-validation";

export const contentKinds = ["SITE_SETTINGS", "MINISTRY", "LEADER", "NEWS", "STORY", "DEVOTIONAL", "EVENT", "SERMON", "SERMON_SERIES", "PODCAST", "PODCAST_EPISODE", "RADIO_PROGRAMME", "RADIO_EPISODE", "SCHEDULE_SLOT", "CAMPAIGN", "GIVING_PURPOSE", "GALLERY_ITEM"] as const;
export type ContentKind = typeof contentKinds[number];

export const contentEntryInputSchema = z.object({
  kind: z.enum(contentKinds),
  slug: z.string().trim().min(1).max(191).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1).max(255),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"]),
  payload: z.unknown(),
});

export function validateContentPayload(kind: ContentKind, payload: unknown) {
  switch (kind) {
    case "SITE_SETTINGS": return siteSettingsSchema.safeParse(payload);
    case "MINISTRY": return ministrySchema.safeParse(payload);
    case "LEADER": return leaderSchema.safeParse(payload);
    case "NEWS": case "STORY": return editorialSchema.safeParse(payload);
    case "DEVOTIONAL": return devotionalSchema.safeParse(payload);
    case "EVENT": return eventSchema.safeParse(payload);
    case "SERMON": case "PODCAST_EPISODE": case "RADIO_EPISODE": return episodeSchema.safeParse(payload);
    case "SERMON_SERIES": case "PODCAST": case "RADIO_PROGRAMME": return collectionSchema.safeParse(payload);
    case "SCHEDULE_SLOT": return scheduleSchema.safeParse(payload);
    case "CAMPAIGN": return campaignSchema.safeParse(payload);
    case "GIVING_PURPOSE": return givingPurposeSchema.safeParse(payload);
    case "GALLERY_ITEM": return gallerySchema.safeParse(payload);
  }
}
