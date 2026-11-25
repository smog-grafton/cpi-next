import "server-only";

import { eq } from "drizzle-orm";

import {
  campaigns,
  devotionals,
  events,
  gallery,
  givingPurposes,
  leaders,
  ministries,
  news,
  podcastEpisodes,
  podcasts,
  radioEpisodes,
  radioProgrammes,
  schedule,
  sermons,
  sermonSeries,
  siteSettings,
  stories,
} from "@/content/demo-content";
import type {
  Campaign,
  Devotional,
  EditorialEntry,
  EventRecord,
  GalleryItem,
  GivingPurpose,
  Leader,
  MediaCollection,
  MediaEpisode,
  Ministry,
  ScheduleSlot,
  SearchResult,
  SiteSettings,
} from "@/domain/models";
import { applyConfirmedCampaignTotals } from "@/domain/campaigns";
import { checkDatabaseConnection, getDatabase, hasDatabaseConfiguration } from "@/server/db/client";
import { contentEntries, donationSubmissions } from "@/server/db/schema";
import {
  campaignSchema,
  collectionSchema,
  devotionalSchema,
  editorialSchema,
  episodeSchema,
  eventSchema,
  gallerySchema,
  givingPurposeSchema,
  leaderSchema,
  ministrySchema,
  scheduleSchema,
  siteSettingsSchema,
} from "./content-validation";

export interface PublicContentSnapshot {
  settings: SiteSettings;
  ministries: Ministry[];
  leaders: Leader[];
  news: EditorialEntry[];
  stories: EditorialEntry[];
  devotionals: Devotional[];
  events: EventRecord[];
  sermons: MediaEpisode[];
  sermonSeries: MediaCollection[];
  podcasts: MediaCollection[];
  podcastEpisodes: MediaEpisode[];
  radioProgrammes: MediaCollection[];
  radioEpisodes: MediaEpisode[];
  schedule: ScheduleSlot[];
  campaigns: Campaign[];
  givingPurposes: GivingPurpose[];
  gallery: GalleryItem[];
  source: "database" | "demonstration";
}

const demoSnapshot: PublicContentSnapshot = {
  settings: siteSettings,
  ministries,
  leaders,
  news,
  stories,
  devotionals,
  events,
  sermons,
  sermonSeries,
  podcasts,
  podcastEpisodes,
  radioProgrammes,
  radioEpisodes,
  schedule,
  campaigns,
  givingPurposes,
  gallery,
  source: "demonstration",
};

export async function getPublicContent(): Promise<PublicContentSnapshot> {
  if (!hasDatabaseConfiguration() || !(await checkDatabaseConnection())) return demoSnapshot;
  const rows = await getDatabase()
    .select({ kind: contentEntries.kind, payload: contentEntries.payload })
    .from(contentEntries)
    .where(eq(contentEntries.status, "PUBLISHED"));
  if (rows.length === 0) return { ...demoSnapshot, source: "database" };

  const snapshot: PublicContentSnapshot = { ...demoSnapshot, source: "database" };
  const grouped = new Map<string, unknown[]>();
  for (const row of rows) grouped.set(row.kind, [...(grouped.get(row.kind) ?? []), row.payload]);
  const parseMany = <T>(kind: string, parser: { safeParse: (value: unknown) => { success: boolean; data?: T } }): T[] =>
    (grouped.get(kind) ?? []).flatMap((payload) => {
      const parsed = parser.safeParse(payload);
      return parsed.success && parsed.data ? [parsed.data] : [];
    });

  const settingsPayload = grouped.get("SITE_SETTINGS")?.[0];
  const parsedSettings = siteSettingsSchema.safeParse(settingsPayload);
  if (parsedSettings.success) snapshot.settings = parsedSettings.data;
  const replacements = {
    ministries: parseMany("MINISTRY", ministrySchema),
    leaders: parseMany("LEADER", leaderSchema),
    news: parseMany("NEWS", editorialSchema),
    stories: parseMany("STORY", editorialSchema),
    devotionals: parseMany("DEVOTIONAL", devotionalSchema),
    events: parseMany("EVENT", eventSchema),
    sermons: parseMany("SERMON", episodeSchema),
    sermonSeries: parseMany("SERMON_SERIES", collectionSchema),
    podcasts: parseMany("PODCAST", collectionSchema),
    podcastEpisodes: parseMany("PODCAST_EPISODE", episodeSchema),
    radioProgrammes: parseMany("RADIO_PROGRAMME", collectionSchema),
    radioEpisodes: parseMany("RADIO_EPISODE", episodeSchema),
    schedule: parseMany("SCHEDULE_SLOT", scheduleSchema),
    campaigns: parseMany("CAMPAIGN", campaignSchema),
    givingPurposes: parseMany("GIVING_PURPOSE", givingPurposeSchema),
    gallery: parseMany("GALLERY_ITEM", gallerySchema),
  };
  for (const [key, value] of Object.entries(replacements)) {
    if (grouped.has(key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase()) || value.length > 0) {
      Object.assign(snapshot, { [key]: value });
    }
  }
  const settlements = await getDatabase()
    .select({
      campaignSlug: donationSubmissions.campaignSlug,
      amountMinor: donationSubmissions.amountMinor,
      status: donationSubmissions.status,
    })
    .from(donationSubmissions)
    .where(eq(donationSubmissions.status, "CONFIRMED"));
  snapshot.campaigns = applyConfirmedCampaignTotals(
    snapshot.campaigns,
    settlements.map((settlement) => ({
      campaignSlug: settlement.campaignSlug ?? undefined,
      amountMinor: settlement.amountMinor,
      status: settlement.status,
    })),
  );
  return snapshot;
}

export async function getMinistry(slug: string): Promise<Ministry | undefined> {
  return (await getPublicContent()).ministries.find((item) => item.slug === slug);
}

export async function getLeader(slug: string): Promise<Leader | undefined> {
  return (await getPublicContent()).leaders.find((item) => item.slug === slug);
}

export async function getEditorialEntry(
  collection: "news" | "stories" | "devotionals",
  slug: string,
): Promise<EditorialEntry | Devotional | undefined> {
  return (await getPublicContent())[collection].find((item) => item.slug === slug);
}

export async function getEvent(slug: string): Promise<EventRecord | undefined> {
  return (await getPublicContent()).events.find((item) => item.slug === slug);
}

export async function getSermon(slug: string): Promise<MediaEpisode | undefined> {
  return (await getPublicContent()).sermons.find((item) => item.slug === slug);
}

export async function getMediaCollection(
  collection: "sermonSeries" | "podcasts" | "radioProgrammes",
  slug: string,
): Promise<MediaCollection | undefined> {
  return (await getPublicContent())[collection].find((item) => item.slug === slug);
}

export async function getPodcastEpisode(
  podcastSlug: string,
  episodeSlug: string,
): Promise<MediaEpisode | undefined> {
  const snapshot = await getPublicContent();
  const podcast = snapshot.podcasts.find((item) => item.slug === podcastSlug);
  if (!podcast?.episodeSlugs.includes(episodeSlug)) return undefined;
  return snapshot.podcastEpisodes.find((item) => item.slug === episodeSlug);
}

export async function getCampaign(slug: string): Promise<Campaign | undefined> {
  return (await getPublicContent()).campaigns.find((item) => item.slug === slug);
}

function includesQuery(values: Array<string | undefined>, query: string): boolean {
  return values.some((value) => value?.toLocaleLowerCase().includes(query));
}

export async function searchPublicContent(rawQuery: string): Promise<SearchResult[]> {
  const query = rawQuery.trim().toLocaleLowerCase();
  if (query.length < 2) return [];
  const content = await getPublicContent();
  const results: SearchResult[] = [];

  for (const ministry of content.ministries) {
    if (includesQuery([ministry.name, ministry.summary, ...ministry.focusAreas], query)) {
      results.push({
        kind: "ministry",
        title: ministry.name,
        excerpt: ministry.summary,
        href: `/ministries/${ministry.slug}`,
        image: ministry.image,
      });
    }
  }

  const editorialCollections = [
    { kind: "news" as const, href: "/news", entries: content.news },
    { kind: "story" as const, href: "/stories", entries: content.stories },
    { kind: "devotional" as const, href: "/devotionals", entries: content.devotionals },
  ];
  for (const collection of editorialCollections) {
    for (const entry of collection.entries) {
      if (includesQuery([entry.title, entry.excerpt, entry.category, ...entry.tags], query)) {
        results.push({
          kind: collection.kind,
          title: entry.title,
          excerpt: entry.excerpt,
          href: `${collection.href}/${entry.slug}`,
          image: entry.image,
        });
      }
    }
  }

  for (const event of content.events) {
    if (includesQuery([event.title, event.summary, event.venueName], query)) {
      results.push({
        kind: "event",
        title: event.title,
        excerpt: event.summary,
        href: `/events/${event.slug}`,
        image: event.image,
      });
    }
  }

  const mediaCollections = [
    { kind: "sermon" as const, href: "/sermons", entries: content.sermons },
    { kind: "podcast" as const, href: "/podcasts", entries: content.podcastEpisodes },
    { kind: "programme" as const, href: "/radio/programmes", entries: content.radioEpisodes },
  ];
  for (const collection of mediaCollections) {
    for (const entry of collection.entries) {
      if (
        includesQuery(
          [entry.title, entry.description, entry.speaker, entry.host, ...entry.scriptureReferences],
          query,
        )
      ) {
        const href = collection.kind === "podcast" && entry.programmeSlug
          ? `/podcasts/${entry.programmeSlug}/episodes/${entry.slug}`
          : collection.kind === "programme" && entry.programmeSlug
            ? `/radio/programmes/${entry.programmeSlug}`
            : `${collection.href}/${entry.slug}`;
        results.push({
          kind: collection.kind,
          title: entry.title,
          excerpt: entry.description,
          href,
          image: entry.artwork,
        });
      }
    }
  }

  return results.slice(0, 30);
}
