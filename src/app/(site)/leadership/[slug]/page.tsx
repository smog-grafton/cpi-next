import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import { getLeader, getPublicContent } from "@/server/repositories/content-repository";

export async function generateStaticParams() { return (await getPublicContent()).leaders.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const leader = await getLeader(slug); return leader ? { title: leader.metaTitle ?? leader.name, description: leader.metaDescription ?? `${leader.role} at CPMI.` } : { title: "Leadership profile" }; }

export default async function LeaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const leader = await getLeader(slug); if (!leader) notFound();
  return <><PageBanner pageName={leader.name} pageTitle={leader.role} breadcrumbs={[{ label: "Home", href: "/" }, { label: "Leadership", href: "/about/leadership" }, { label: leader.name }]} /><section className="team-details-wrap section-padding"><div className="container"><div className="row g-5"><div className="col-lg-5"><div className="approved-image-wrap"><Image src={leader.portrait.src} alt={leader.portrait.alt} width={760} height={920} />{leader.portrait.temporary && <span className="image-review-label">Portrait awaiting client approval</span>}</div></div><div className="col-lg-7"><span className="content-label">{leader.category}</span><h2>{leader.name}</h2><h4>{leader.role}</h4>{leader.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<h3>Ministry assignments</h3><ul className="checked-list">{leader.assignments.map((assignment) => <li key={assignment}><i className="far fa-check" />{assignment}</li>)}</ul><Link href="/about/leadership" className="theme-btn transparent-btn-2">Back to leadership</Link></div></div></div></section></>;
}
