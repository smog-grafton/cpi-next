import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import EpisodeDetail from "@/components/media/EpisodeDetail";
import { getPodcastEpisode, getPublicContent } from "@/server/repositories/content-repository";

export async function generateStaticParams() { const content = await getPublicContent(); return content.podcasts.flatMap((podcast) => podcast.episodeSlugs.map((episodeSlug) => ({ slug: podcast.slug, episodeSlug }))); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string; episodeSlug: string }> }): Promise<Metadata> { const { slug, episodeSlug } = await params; const item = await getPodcastEpisode(slug, episodeSlug); return item ? { title: item.title, description: item.description } : { title: "Podcast episode" }; }
export default async function PodcastEpisodePage({ params }: { params: Promise<{ slug: string; episodeSlug: string }> }) { const { slug, episodeSlug } = await params; const episode = await getPodcastEpisode(slug, episodeSlug); if (!episode) notFound(); return <><PageBanner pageName={episode.title} /><EpisodeDetail episode={episode} backHref={`/podcasts/${slug}`} backLabel="podcast" /></>; }
