import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = {
  title: "About",
  description: "The story, vision, mission and beliefs of Christian Power Ministries International.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const { settings, leaders } = await getPublicContent();
  const founderName = settings.founderName ?? "Pastor Stephen Kabuye";
  const foundedIn = settings.foundedIn ?? "Johannesburg, South Africa";
  const foundedYear = settings.foundedYear ?? 2014;
  const founder = leaders.find((leader) => leader.name === founderName);

  return <>
    <PageBanner pageName="About CPMI" pageTitle="Kingdom people. Purposeful leadership. Compassionate service." />
    <section className="about-section-3 section-padding">
      <div className="container"><div className="row g-5 align-items-center">
        <div className="col-lg-6"><div className="about-image-items-2"><div className="row g-4 align-items-center">
          <div className="col-7"><Image src="/assets/img/about/08.jpg" alt="Temporary Danbox photograph representing CPMI worship and fellowship" width={620} height={780} /></div>
          <div className="col-5"><Image src="/assets/img/about/09.jpg" alt="Temporary Danbox photograph representing community service" width={420} height={560} /><div className="about-purpose-seal"><span>Since {foundedYear}</span><small>{foundedIn}</small></div></div>
        </div></div></div>
        <div className="col-lg-6">
          <SectionHeading eyebrow="Our story" title="A multicultural Kingdom community founded in Johannesburg" align="start" />
          <p className="vision-lead">{settings.declaration}</p>
          <p>Christian Power Ministries International was established by {founderName} in {foundedIn} in {foundedYear}. CPMI brings together Christians from different nations and cultures for joyful worship, practical teaching, fellowship and service.</p>
          <p>The Kingdom message does not change, but the ministry uses relevant methods—including education, media, radio, community care and leadership development—to help people understand and live it.</p>
          <div className="about-button"><Link href="/about/vision-mission" className="theme-btn">Vision & mission</Link></div>
        </div>
      </div></div>
    </section>

    <section className="section-padding section-bg">
      <div className="container">
        <SectionHeading eyebrow="Our objectives" title="Teaching, leadership, media and compassionate service" />
        <div className="objective-grid">{settings.objectives.map((objective, index) => <article key={objective}><span>{String(index + 1).padStart(2, "0")}</span><p>{objective}</p></article>)}</div>
      </div>
    </section>

    {settings.beliefs && <section className="section-padding cpmi-beliefs-section">
      <div className="container">
        <SectionHeading eyebrow="What we believe" title="A faith rooted in Scripture and lived in community" />
        <div className="belief-grid">{settings.beliefs.map((belief) => <article key={belief.title}><i className="far fa-book-open" aria-hidden="true" /><h3>{belief.title}</h3><p>{belief.summary}</p><small>{belief.references.join(" · ")}</small></article>)}</div>
      </div>
    </section>}

    {settings.weeklyRhythm && <section className="section-padding section-bg"><div className="container">
      <SectionHeading eyebrow="A week at CPMI" title="Worship, formation, prayer and service" intro="Sunday is the confirmed public celebration; contact the ministry for current details about weekday gatherings." />
      <div className="ministry-rhythm">{settings.weeklyRhythm.map((item) => <article key={item.day}><span>{item.day}</span><div><h3>{item.title}</h3><p>{item.summary}</p></div>{item.time && <strong>{item.time}</strong>}</article>)}</div>
    </div></section>}

    {founder && <section className="section-padding"><div className="container"><div className="row g-5 align-items-center">
      <div className="col-lg-4"><div className="approved-image-wrap"><Image src={founder.portrait.src} alt={founder.portrait.alt} width={620} height={760} />{founder.portrait.temporary && <span className="image-review-label">Portrait awaiting client approval</span>}</div></div>
      <div className="col-lg-8"><SectionHeading eyebrow="Founder" title={founder.name} intro={founder.biography[0]} align="start" /><p>{founder.biography[1]}</p><Link href={`/leadership/${founder.slug}`} className="theme-btn transparent-btn-2">Read profile</Link></div>
    </div></div></section>}

    <section className="cta-section-2 cpmi-final-invitation"><div className="container"><div className="cta-wrapper-2"><div className="row align-items-center"><div className="col-lg-8"><span>Take your next step</span><h2>Explore a ministry or plan your first visit.</h2></div><div className="col-lg-4"><div className="cta-actions"><Link href="/ministries" className="theme-btn">Ministries</Link><Link href="/plan-your-visit" className="theme-btn transparent-btn">Plan a visit</Link></div></div></div></div></div></section>
  </>;
}
