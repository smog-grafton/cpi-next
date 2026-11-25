import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import EditorialDetail from "@/components/site/EditorialDetail";
import { getEditorialEntry, getPublicContent } from "@/server/repositories/content-repository";

export async function generateStaticParams() { return (await getPublicContent()).news.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const entry = await getEditorialEntry("news", slug); return entry ? { title: entry.metaTitle ?? entry.title, description: entry.metaDescription ?? entry.excerpt } : { title: "News" }; }
export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const entry = await getEditorialEntry("news", slug); if (!entry || "scriptureReferences" in entry) notFound(); const content = await getPublicContent(); return <><PageBanner pageName={entry.title} pageTitle={entry.title} breadcrumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: entry.title }]} /><EditorialDetail entry={entry} basePath="/news" related={content.news.filter((item) => item.slug !== entry.slug)} /></>; }
