import type { Metadata } from "next";
import HomepageHero from "@/components/home/HomepageHero";
import { BroadcastGateway, EventsAndNews, FaithInAction, FinalInvitation, GivingInvitation, MinistriesSection, TeachingSection, VisionSection } from "@/components/home/HomeSections";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Faith, purpose and service", alternates: { canonical: "/" } };

export default async function HomePage() {
  const content = await getPublicContent();
  const streamConfigured = Boolean(process.env.RADIO_PRIMARY_STREAM_URL?.trim());
  const videoConfigured = Boolean(process.env.LIVE_VIDEO_HLS_URL?.trim() || process.env.LIVE_VIDEO_EMBED_URL?.trim());
  return <><HomepageHero videoUrl={process.env.HOMEPAGE_HERO_VIDEO_URL?.trim()} /><BroadcastGateway streamConfigured={streamConfigured} videoConfigured={videoConfigured} /><VisionSection content={content} /><MinistriesSection content={content} /><TeachingSection content={content} /><FaithInAction content={content} /><GivingInvitation content={content} /><EventsAndNews content={content} /><FinalInvitation /></>;
}
