export type PublicationStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";
export type MediaKind = "AUDIO" | "VIDEO" | "IMAGE";
export type DonationStatus = "PENDING" | "CONFIRMED" | "REJECTED";
export type AdminRole =
  | "CONTENT_EDITOR"
  | "FINANCE_REVIEWER"
  | "MINISTRY_ADMIN"
  | "SUPER_ADMIN";

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  canonicalPath?: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  temporary?: boolean;
}

export interface Ministry extends SeoFields {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  focusAreas: string[];
  image: ImageAsset;
  featured?: boolean;
  leaderSlug?: string;
  contactEmail?: string;
}

export interface Leader extends SeoFields {
  slug: string;
  name: string;
  role: string;
  category: string;
  biography: string[];
  assignments: string[];
  portrait: ImageAsset;
  socialLinks?: Array<{ label: string; href: string }>;
}

export interface EditorialEntry extends SeoFields {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  tags: string[];
  publishedAt?: string;
  author?: string;
  status: PublicationStatus;
  image: ImageAsset;
  sample?: boolean;
}

export interface Devotional extends EditorialEntry {
  scriptureReferences: string[];
  relatedSermonSlugs: string[];
}

export interface EventRecord extends SeoFields {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  startsAt: string;
  endsAt?: string;
  timezone: string;
  venueName?: string;
  venueAddress?: string;
  onlineUrl?: string;
  capacity?: number;
  registrationEnabled: boolean;
  status: PublicationStatus;
  image: ImageAsset;
  sample?: boolean;
}

export interface MediaEpisode extends SeoFields {
  slug: string;
  title: string;
  description: string;
  mediaType: Exclude<MediaKind, "IMAGE">;
  mediaUrl?: string;
  audioUrl?: string;
  artwork: ImageAsset;
  durationSeconds?: number;
  publishedAt?: string;
  speaker?: string;
  host?: string;
  scriptureReferences: string[];
  seriesSlug?: string;
  programmeSlug?: string;
  status: PublicationStatus;
  sample?: boolean;
}

export interface MediaCollection extends SeoFields {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  artwork: ImageAsset;
  kind: "SERMON_SERIES" | "PODCAST" | "RADIO_PROGRAMME";
  host?: string;
  episodeSlugs: string[];
  status: PublicationStatus;
  sample?: boolean;
}

export interface ScheduleSlot {
  id: string;
  programmeSlug: string;
  dayOfWeek: number;
  startsAtLocal: string;
  endsAtLocal: string;
  timezone: string;
  sample?: boolean;
}

export interface Campaign extends SeoFields {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  category: string;
  goalMinor?: number;
  verifiedRaisedMinor: number;
  currency: string;
  image: ImageAsset;
  status: PublicationStatus;
  sample?: boolean;
}

export interface GivingPurpose {
  id: string;
  label: string;
  description: string;
  campaignSlug?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: ImageAsset;
}

export interface SiteSettings {
  organizationName: string;
  shortName: string;
  declaration?: string;
  values?: string[];
  foundedYear?: number;
  foundedIn?: string;
  founderName?: string;
  vision: string;
  mission: string;
  scriptureReference: string;
  missionScriptures?: string[];
  beliefs?: Array<{ title: string; summary: string; references: string[] }>;
  weeklyRhythm?: Array<{ day: string; title: string; summary: string; time?: string }>;
  objectives: string[];
  publicEmail?: string;
  publicPhone?: string;
  address?: string;
  timezone: string;
  siteUrl: string;
  socialLinks: Array<{ label: string; href: string; icon: string }>;
}

export interface SearchResult {
  kind:
    | "ministry"
    | "news"
    | "story"
    | "devotional"
    | "event"
    | "sermon"
    | "podcast"
    | "programme";
  title: string;
  excerpt: string;
  href: string;
  image?: ImageAsset;
}

export interface DonationSubmission {
  reference: string;
  purposeId: string;
  campaignSlug?: string;
  amountMinor: number;
  currency: string;
  paymentMethod: string;
  transactionReference: string;
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
  evidencePath?: string;
  status: DonationStatus;
  reviewReason?: string;
  createdAt: string;
  reviewedAt?: string;
}
