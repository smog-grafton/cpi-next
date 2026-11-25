import type { Metadata } from "next";
import Link from "next/link";
import VideoPlayer from "@/components/media/VideoPlayer";
import ReturnToPlayer from "@/components/media/ReturnToPlayer";
import { MediaCard } from "@/components/site/Cards";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Live", alternates: { canonical: "/live" } };

function safeEmbed(raw?: string) {
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    const allowed = new Set(["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"]);
    return url.protocol === "https:" && allowed.has(url.hostname) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export default async function LivePage() {
  const { sermons } = await getPublicContent();
  const hlsUrl = process.env.LIVE_VIDEO_HLS_URL?.trim();
  const embedUrl = safeEmbed(process.env.LIVE_VIDEO_EMBED_URL?.trim());
  const configured = Boolean(hlsUrl || embedUrl);

  return (
    <div className="live-view-page">
      <section className="media-page-masthead live-masthead">
        <div className="container">
          <div className="media-page-nav"><span><i className="far fa-signal-stream" /> Broadcast centre</span><div><Link href="/radio">Listen</Link><Link href="/watch">Watch</Link><Link href="/sermons">Messages</Link></div></div>
          <div className="live-stage-grid">
            <div id="broadcast-player" className="live-stage-player" tabIndex={-1}><VideoPlayer hlsUrl={hlsUrl} embedUrl={embedUrl} poster="/assets/img/brand/cpmi/cpmi-hero-worship.png" /></div>
            <aside className="live-stage-info">
              <span className={`broadcast-state${configured ? " is-ready" : ""}`}><i />{configured ? "Source ready" : "Off air"}</span>
              <h1>Worship and the Word, wherever you are.</h1>
              <p>Live video begins here. Between broadcasts, choose a message below or keep CPMI Radio playing as you browse.</p>
              <div><Link href="/sermons" className="theme-btn">Browse messages</Link><Link href="/radio" className="text-link">Open radio <i className="far fa-arrow-right" /></Link></div>
            </aside>
          </div>
        </div>
      </section>
      <ReturnToPlayer />
      <section className="live-recordings-section">
        <div className="container">
          <div className="radio-programme-heading"><div><span>Continue watching</span><h2>Messages for the week</h2></div><Link href="/sermons">All messages <i className="far fa-arrow-right" /></Link></div>
          <div className="media-grid">{sermons.slice(0, 3).map((sermon) => <MediaCard episode={sermon} basePath="/sermons" key={sermon.slug} />)}</div>
        </div>
      </section>
    </div>
  );
}
