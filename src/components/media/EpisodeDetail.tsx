import Image from "next/image";
import Link from "next/link";
import type { MediaEpisode } from "@/domain/models";

export default function EpisodeDetail({ episode, backHref, backLabel }: { episode: MediaEpisode; backHref: string; backLabel: string }) {
  return (
    <section className="section-padding episode-detail">
      <div className="container"><div className="row g-5">
        <div className="col-lg-5"><Image src={episode.artwork.src} alt={episode.artwork.alt} width={820} height={820} priority /></div>
        <div className="col-lg-7">
          <span className="content-label">{episode.sample ? "Episode preview" : episode.mediaType === "AUDIO" ? "Audio teaching" : "Video teaching"}</span>
          <h2>{episode.title}</h2><p className="lead">{episode.description}</p>
          <dl className="episode-meta">
            {episode.speaker && <><dt>Speaker</dt><dd>{episode.speaker}</dd></>}
            {episode.host && <><dt>Host</dt><dd>{episode.host}</dd></>}
            {episode.publishedAt && <><dt>Published</dt><dd>{new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(episode.publishedAt))}</dd></>}
            {episode.durationSeconds && <><dt>Duration</dt><dd>{Math.round(episode.durationSeconds / 60)} minutes</dd></>}
          </dl>
          {episode.mediaUrl || episode.audioUrl ? <div className="episode-player">{episode.mediaType === "VIDEO" && episode.mediaUrl ? <video src={episode.mediaUrl} poster={episode.artwork.src} controls playsInline /> : <audio src={episode.audioUrl ?? episode.mediaUrl} controls preload="metadata" />}</div> : <div className="episode-preview-player"><span><i className="far fa-waveform-lines" /></span><div><strong>Preview episode</strong><p>The recording will be available here.</p></div></div>}
          {episode.scriptureReferences.length > 0 && <div className="scripture-references"><h3>Scripture references</h3>{episode.scriptureReferences.map((reference) => <Link href={`/scripture?reference=${encodeURIComponent(reference)}`} key={reference}>{reference}</Link>)}</div>}
          <Link href={backHref} className="theme-btn transparent-btn-2">Back to {backLabel}</Link>
        </div>
      </div></div>
    </section>
  );
}
