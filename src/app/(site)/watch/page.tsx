import type { Metadata } from "next";
import Link from "next/link";
import VideoPlayer from "@/components/media/VideoPlayer";
import ReturnToPlayer from "@/components/media/ReturnToPlayer";
import { MediaCard } from "@/components/site/Cards";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Watch", alternates: { canonical: "/watch" } };

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

export default async function WatchPage() {
  const { sermons } = await getPublicContent();
  const hlsUrl = process.env.LIVE_VIDEO_HLS_URL?.trim();
  const embedUrl = safeEmbed(process.env.LIVE_VIDEO_EMBED_URL?.trim());
  const videos = sermons.filter((item) => item.mediaType === "VIDEO");

  return (
    <div className="live-view-page">
      <section className="media-page-masthead live-masthead">
        <div className="container">
          <div className="media-page-nav"><span><i className="far fa-circle-play" /> Watch</span><div><Link href="/live">Live hub</Link><Link href="/sermons">All messages</Link><Link href="/podcasts">Podcasts</Link></div></div>
          <div className="watch-stage"><div id="broadcast-player" tabIndex={-1}><VideoPlayer hlsUrl={hlsUrl} embedUrl={embedUrl} poster="/assets/img/brand/cpmi/cpmi-hero-worship.png" /></div><div className="watch-stage-caption"><span>CPMI Watch</span><h1>Live and on demand.</h1><p>Join worship live or choose a teaching from the library.</p></div></div>
        </div>
      </section>
      <ReturnToPlayer />
      <section className="live-recordings-section">
        <div className="container">
          <div className="radio-programme-heading"><div><span>Video library</span><h2>Watch when it works for you</h2></div><Link href="/sermons">All messages <i className="far fa-arrow-right" /></Link></div>
          <div className="media-grid">{videos.map((episode) => <MediaCard episode={episode} basePath="/sermons" key={episode.slug} />)}</div>
        </div>
      </section>
    </div>
  );
}
