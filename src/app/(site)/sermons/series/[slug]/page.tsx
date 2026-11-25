import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { MediaCard } from "@/components/site/Cards";
import EmptyState from "@/components/site/EmptyState";
import { getMediaCollection, getPublicContent } from "@/server/repositories/content-repository";

export async function generateStaticParams() { return (await getPublicContent()).sermonSeries.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const item = await getMediaCollection("sermonSeries", (await params).slug); return item ? { title: item.title, description: item.summary } : { title: "Sermon series" }; }
export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const series = await getMediaCollection("sermonSeries", slug); if (!series) notFound(); const content = await getPublicContent(); const episodes = content.sermons.filter((episode) => episode.seriesSlug === slug); return <><PageBanner pageName={series.title} /><section className="section-padding collection-detail"><div className="container"><div className="row g-5 align-items-center"><div className="col-lg-5"><Image src={series.artwork.src} alt={series.artwork.alt} width={820} height={820} /></div><div className="col-lg-7"><span className="content-label">Sermon series</span><h2>{series.title}</h2><p className="lead">{series.summary}</p>{series.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div><div className="collection-episodes">{episodes.length ? <div className="media-grid">{episodes.map((episode) => <MediaCard episode={episode} basePath="/sermons" key={episode.slug} />)}</div> : <EmptyState title="No series episodes are published" message="Approved messages will be linked to this series here." />}</div></div></section></>; }
