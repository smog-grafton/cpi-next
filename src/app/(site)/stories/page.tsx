import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { EditorialCard } from "@/components/site/Cards";
import EmptyState from "@/components/site/EmptyState";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Stories", alternates: { canonical: "/stories" } };
export default async function StoriesPage() { const { stories } = await getPublicContent(); return <><PageBanner pageName="Stories" pageTitle="Faith in action, told with dignity" /><section className="section-padding"><div className="container"><SectionHeading eyebrow="Community stories" title="Verified testimony and impact" intro="Stories publish only with appropriate consent and verified ministry context." />{stories.length ? <div className="row g-4">{stories.map((entry, index) => <EditorialCard entry={entry} basePath="/stories" index={index} key={entry.slug} />)}</div> : <EmptyState icon="far fa-book-heart" title="No community stories are published yet" message="CPMI has not supplied approved stories or consented photography. Nothing has been fabricated for appearance." action={{ label: "Explore ministries", href: "/ministries" }} />}</div></section></>; }
