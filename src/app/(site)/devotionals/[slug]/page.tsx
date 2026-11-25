import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import EditorialDetail from "@/components/site/EditorialDetail";
import { getEditorialEntry, getPublicContent } from "@/server/repositories/content-repository";

export async function generateStaticParams() { return (await getPublicContent()).devotionals.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const entry = await getEditorialEntry("devotionals", (await params).slug); return entry ? { title: entry.title, description: entry.excerpt } : { title: "Devotional" }; }
export default async function DevotionalPage({ params }: { params: Promise<{ slug: string }> }) { const entry = await getEditorialEntry("devotionals", (await params).slug); if (!entry || !("scriptureReferences" in entry)) notFound(); return <><PageBanner pageName={entry.title} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Devotionals", href: "/devotionals" }, { label: entry.title }]} /><EditorialDetail entry={entry} basePath="/devotionals" /></>; }
