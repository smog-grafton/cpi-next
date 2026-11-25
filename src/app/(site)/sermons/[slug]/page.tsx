import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import EpisodeDetail from "@/components/media/EpisodeDetail";
import { getPublicContent, getSermon } from "@/server/repositories/content-repository";

export async function generateStaticParams() { return (await getPublicContent()).sermons.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const item = await getSermon((await params).slug); return item ? { title: item.title, description: item.description } : { title: "Sermon" }; }
export default async function SermonPage({ params }: { params: Promise<{ slug: string }> }) { const sermon = await getSermon((await params).slug); if (!sermon) notFound(); return <><PageBanner pageName={sermon.title} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sermons", href: "/sermons" }, { label: sermon.title }]} /><EpisodeDetail episode={sermon} backHref="/sermons" backLabel="sermons" /></>; }
