import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Leadership", alternates: { canonical: "/about/leadership" } };

export default async function LeadershipPage() {
  const { leaders } = await getPublicContent();
  return <><PageBanner pageName="Leadership" breadcrumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Leadership" }]} /><section className="volunter-section section-padding"><div className="container"><SectionHeading eyebrow="Servant leadership" title="People, roles and ministry assignments" /><div className="row g-4 justify-content-center">{leaders.map((leader) => <div className="col-xl-4 col-lg-6 col-md-6" key={leader.slug}><article className="volunter-items"><div className="volunter-image approved-image-wrap"><Image src={leader.portrait.src} alt={leader.portrait.alt} width={620} height={760} />{leader.portrait.temporary && <span className="image-review-label">Portrait awaiting approval</span>}<div className="volunter-content text-center"><h3><Link href={`/leadership/${leader.slug}`}>{leader.name}</Link></h3><p>{leader.role}</p></div></div></article></div>)}</div></div></section></>;
}
