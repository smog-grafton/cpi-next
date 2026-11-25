import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Vision & mission", alternates: { canonical: "/about/vision-mission" } };

export default async function VisionMissionPage() {
  const { settings } = await getPublicContent();
  return <>
    <PageBanner pageName="Vision & mission" breadcrumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Vision & mission" }]} />
    <section className="section-padding vision-mission-page"><div className="container"><div className="statement-pair">
      <article className="statement-panel vision-panel"><span>Vision</span><h2>{settings.vision}</h2></article>
      <article className="statement-panel mission-panel"><span>Mission</span><h2>{settings.mission}</h2></article>
    </div></div></section>
    <section className="section-padding section-bg"><div className="container">
      <SectionHeading eyebrow="How the mission takes shape" title="Organisational objectives" />
      <div className="objective-grid">{settings.objectives.map((objective, index) => <article key={objective}><span>{String(index + 1).padStart(2, "0")}</span><p>{objective}</p></article>)}</div>
      <div className="scripture-reference-panel"><div><span>Mission foundation</span><h3>{settings.missionScriptures?.join(" · ") ?? settings.scriptureReference}</h3></div><p>CPMI&apos;s mission joins Christ&apos;s call to make disciples with the responsibility to steward, lead and serve.</p></div>
    </div></section>
    {settings.values && <section className="section-padding"><div className="container"><SectionHeading eyebrow="Kingdom culture" title="The values we seek to embody" /><div className="values-strip">{settings.values.map((value) => <span key={value}>{value}</span>)}</div></div></section>}
    <section className="section-padding pt-0"><div className="container"><div className="next-step-panel"><SectionHeading eyebrow="Put faith into action" title="Learn, serve, pray or participate" align="start" /><div className="next-step-links"><Link href="/ministries">Explore ministries</Link><Link href="/get-involved">Get involved</Link><Link href="/prayer">Request prayer</Link><Link href="/give">Give</Link></div></div></div></section>
  </>;
}
