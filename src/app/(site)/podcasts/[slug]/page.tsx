import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import EmptyState from "@/components/site/EmptyState";
import { getMediaCollection, getPublicContent } from "@/server/repositories/content-repository";

export async function generateStaticParams() { return (await getPublicContent()).podcasts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const item = await getMediaCollection("podcasts", (await params).slug); return item ? { title: item.title, description: item.summary } : { title: "Podcast" }; }
export default async function PodcastPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const podcast = await getMediaCollection("podcasts", slug); if (!podcast) notFound(); const content = await getPublicContent(); const episodes = content.podcastEpisodes.filter((episode) => podcast.episodeSlugs.includes(episode.slug)); return <><PageBanner pageName={podcast.title} /><section className="section-padding collection-detail"><div className="container"><div className="row g-5 align-items-center"><div className="col-lg-5"><Image src={podcast.artwork.src} alt={podcast.artwork.alt} width={820} height={820} /></div><div className="col-lg-7"><span className="content-label">Podcast</span><h2>{podcast.title}</h2><p className="lead">{podcast.summary}</p>{podcast.host && <p><strong>Host:</strong> {podcast.host}</p>}{podcast.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div><div className="collection-episodes">{episodes.length ? <div className="episode-list">{episodes.map((episode) => <Link href={`/podcasts/${podcast.slug}/episodes/${episode.slug}`} key={episode.slug}><span><i className="far fa-play" /></span><div><strong>{episode.title}</strong><small>{episode.description}</small></div></Link>)}</div> : <EmptyState title="No podcast episodes are published" message="Approved recordings will appear here." />}</div></div></section></>; }
