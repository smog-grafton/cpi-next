import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { MediaCard } from "@/components/site/Cards";
import { getMediaCollection, getPublicContent } from "@/server/repositories/content-repository";

export async function generateStaticParams() { return (await getPublicContent()).radioProgrammes.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const item = await getMediaCollection("radioProgrammes", (await params).slug); return item ? { title: item.title, description: item.summary } : { title: "Radio programme" }; }

export default async function ProgrammeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const programme = await getMediaCollection("radioProgrammes", slug);
  if (!programme) notFound();
  const content = await getPublicContent();
  const episodes = content.radioEpisodes.filter((episode) => episode.programmeSlug === slug);
  return <><PageBanner pageName={programme.title} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Radio programmes", href: "/radio/programmes" }, { label: programme.title }]} /><section className="section-padding collection-detail"><div className="container"><div className="row g-5 align-items-center"><div className="col-lg-5"><Image src={programme.artwork.src} alt={programme.artwork.alt} width={820} height={820} /></div><div className="col-lg-7"><span className="content-label">{programme.sample ? "Programme preview" : "Radio programme"}</span><h2>{programme.title}</h2><p className="lead">{programme.summary}</p>{programme.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link href="/radio" className="theme-btn">Open radio player</Link></div></div><div className="collection-episodes"><div className="media-grid">{episodes.map((episode) => <MediaCard episode={episode} basePath="/radio/programmes" href={`/radio/programmes/${programme.slug}`} key={episode.slug} />)}</div></div></div></section></>;
}
