import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { MediaCard } from "@/components/site/Cards";
import EmptyState from "@/components/site/EmptyState";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Sermons", alternates: { canonical: "/sermons" } };
export default async function SermonsPage() { const { sermons } = await getPublicContent(); return <><PageBanner pageName="Sermons" pageTitle="Teaching for faith, leadership and purpose" /><section className="section-padding section-bg"><div className="container"><SectionHeading eyebrow="Watch & listen" title="Messages and teaching series" intro="Continue learning through Kingdom teaching, practical discipleship and Scripture." />{sermons.length ? <div className="media-grid">{sermons.map((episode) => <MediaCard episode={episode} basePath="/sermons" key={episode.slug} />)}</div> : <EmptyState icon="far fa-microphone-lines" title="Begin with a devotional" message="Read a short reflection while the teaching library is being prepared." action={{ label: "Explore devotionals", href: "/devotionals" }} />}</div></section></>; }
