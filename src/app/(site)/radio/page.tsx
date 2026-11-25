import type { Metadata } from "next";
import Link from "next/link";
import RadioConsole from "@/components/media/RadioConsole";
import ReturnToPlayer from "@/components/media/ReturnToPlayer";
import { CollectionCard } from "@/components/site/Cards";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = {
  title: "CPMI Radio",
  description: "Listen to CPMI Radio and explore programme previews and the weekly schedule.",
  alternates: { canonical: "/radio" },
};

export default async function RadioPage() {
  const { radioProgrammes } = await getPublicContent();
  const featured = radioProgrammes[0];

  return (
    <div className="radio-listen-page">
      <section className="media-page-masthead">
        <div className="container">
          <div className="media-page-nav">
            <span><i className="far fa-waveform-lines" /> Listen</span>
            <div><Link href="/live">Live hub</Link><Link href="/radio/schedule">Schedule</Link><Link href="/radio/programmes">Programmes</Link></div>
          </div>
          <div id="broadcast-player" tabIndex={-1}>
            <RadioConsole featuredProgramme={featured ? `Featured preview · ${featured.title}` : undefined} />
          </div>
        </div>
      </section>
      <ReturnToPlayer radio />

      <section className="radio-after-console">
        <div className="container">
          <div className="radio-quick-links">
            <Link href="/radio/schedule"><i className="far fa-calendar-clock" /><span><small>This week</small><strong>Programme schedule</strong></span><i className="far fa-arrow-right" /></Link>
            <Link href="/radio/programmes"><i className="far fa-grid-2" /><span><small>Explore</small><strong>All radio programmes</strong></span><i className="far fa-arrow-right" /></Link>
            <Link href="/podcasts"><i className="far fa-podcast" /><span><small>On demand</small><strong>Podcasts & conversations</strong></span><i className="far fa-arrow-right" /></Link>
          </div>
          <div className="radio-programme-heading"><div><span>Programme previews</span><h2>A rhythm for the whole week</h2></div><p>Morning reflection, purposeful teaching and a quieter close to the day.</p></div>
          <div className="media-grid radio-programme-grid">
            {radioProgrammes.map((programme) => <CollectionCard collection={programme} basePath="/radio/programmes" key={programme.slug} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
