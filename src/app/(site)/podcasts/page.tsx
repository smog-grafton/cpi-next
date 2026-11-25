import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { CollectionCard } from "@/components/site/Cards";
import EmptyState from "@/components/site/EmptyState";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Podcasts", alternates: { canonical: "/podcasts" } };
export default async function PodcastsPage() { const { podcasts } = await getPublicContent(); return <><PageBanner pageName="Podcasts" pageTitle="Conversations and teaching for the week" /><section className="section-padding section-bg"><div className="container"><SectionHeading eyebrow="On demand" title="CPMI podcasts" />{podcasts.length ? <div className="media-grid">{podcasts.map((item) => <CollectionCard collection={item} basePath="/podcasts" key={item.slug} />)}</div> : <EmptyState icon="far fa-podcast" title="No podcast series are published" message="Approved series, hosts and episodes will appear here." action={{ label: "Listen to radio", href: "/radio" }} />}</div></section></>; }
