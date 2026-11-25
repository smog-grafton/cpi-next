import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { EditorialCard } from "@/components/site/Cards";
import EmptyState from "@/components/site/EmptyState";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "News", alternates: { canonical: "/news" } };
export default async function NewsPage() { const { news } = await getPublicContent(); return <><PageBanner pageName="News" pageTitle="Announcements, updates and ministry life" /><section className="news-section section-padding section-bg"><div className="container"><SectionHeading eyebrow="Latest news" title="Stay connected to CPMI" />{news.length ? <div className="row g-4">{news.map((entry, index) => <EditorialCard entry={entry} basePath="/news" index={index} key={entry.slug} />)}</div> : <EmptyState title="No news is published" message="Approved announcements will appear here." />}</div></section></>; }
