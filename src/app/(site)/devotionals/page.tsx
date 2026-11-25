import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { EditorialCard } from "@/components/site/Cards";
import EmptyState from "@/components/site/EmptyState";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Devotionals", alternates: { canonical: "/devotionals" } };
export default async function DevotionalsPage() { const { devotionals } = await getPublicContent(); return <><PageBanner pageName="Devotionals" pageTitle="Pause, read and walk with the Word" /><section className="section-padding section-bg"><div className="container"><SectionHeading eyebrow="Daily formation" title="Devotionals for faith and purpose" />{devotionals.length ? <div className="row g-4">{devotionals.map((entry, index) => <EditorialCard entry={entry} basePath="/devotionals" index={index} key={entry.slug} />)}</div> : <EmptyState title="No devotionals are published" message="Approved readings will appear here." />}</div></section></>; }
