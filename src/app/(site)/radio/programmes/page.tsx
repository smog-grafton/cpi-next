import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { CollectionCard } from "@/components/site/Cards";
import EmptyState from "@/components/site/EmptyState";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Radio programmes", alternates: { canonical: "/radio/programmes" } };
export default async function ProgrammesPage() { const { radioProgrammes } = await getPublicContent(); return <><PageBanner pageName="Radio programmes" /><section className="section-padding section-bg"><div className="container"><SectionHeading eyebrow="CPMI Radio" title="Programmes and recorded episodes" />{radioProgrammes.length ? <div className="media-grid">{radioProgrammes.map((item) => <CollectionCard collection={item} basePath="/radio/programmes" key={item.slug} />)}</div> : <EmptyState title="No programmes are published" message="Approved titles, hosts, schedules and archives will appear here." />}</div></section></>; }
