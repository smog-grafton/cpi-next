import Image from "next/image";
import Link from "next/link";
import { campaignProgress } from "@/domain/campaigns";
import type { Campaign, EditorialEntry, EventRecord, MediaCollection, MediaEpisode, Ministry } from "@/domain/models";

export function MinistryCard({ ministry, index = 0 }: { ministry: Ministry; index?: number }) {
  return <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay={`${0.2 + index * 0.1}s`}><article className="donation-card-items cpmi-ministry-card"><div className="ministry-card-image"><Image src={ministry.image.src} alt={ministry.image.alt} width={640} height={460} sizes="(max-width: 767px) 100vw, 33vw" /></div><div className="content"><span className="content-label">Ministry</span><h3><Link href={`/ministries/${ministry.slug}`}>{ministry.name}</Link></h3><p>{ministry.summary}</p><Link href={`/ministries/${ministry.slug}`} className="donation-btn"><i className="fal fa-plus" aria-hidden="true" /> Explore ministry</Link></div></article></div>;
}

export function EditorialCard({ entry, basePath, index = 0 }: { entry: EditorialEntry; basePath: string; index?: number }) {
  return <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay={`${0.2 + index * 0.1}s`}><article className="single-news-items cpmi-editorial-card"><div className="news-image"><Image src={entry.image.src} alt={entry.image.alt} width={760} height={520} sizes="(max-width: 767px) 100vw, 33vw" />{entry.sample && <span className="sample-label">Editorial preview</span>}</div><div className="news-content"><div className="post-cat"><span><i className="far fa-folder" aria-hidden="true" /> {entry.category}</span>{entry.publishedAt && <time dateTime={entry.publishedAt}>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(entry.publishedAt))}</time>}</div><h3><Link href={`${basePath}/${entry.slug}`}>{entry.title}</Link></h3><p>{entry.excerpt}</p><Link href={`${basePath}/${entry.slug}`} className="link-btn">Read more <i className="far fa-arrow-right" aria-hidden="true" /></Link></div></article></div>;
}

export function EventCard({ event, index = 0 }: { event: EventRecord; index?: number }) {
  const start = new Date(event.startsAt);
  return <div className="col-lg-6 wow fadeInUp" data-wow-delay={`${0.2 + index * 0.1}s`}><article className="event-box-items-2"><div className="event-image"><Image src={event.image.src} alt={event.image.alt} width={620} height={720} sizes="(max-width: 991px) 100vw, 50vw" />{event.sample && <span className="sample-label">Event preview</span>}</div><div className="event-content"><ul><li><i className="fal fa-calendar-alt" aria-hidden="true" /> <time dateTime={event.startsAt}>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(start)}</time></li><li><i className="far fa-clock" aria-hidden="true" /> {new Intl.DateTimeFormat("en", { timeStyle: "short", timeZone: event.timezone }).format(start)}</li>{event.venueName && <li><i className="far fa-map-marker-alt" aria-hidden="true" /> {event.venueName}</li>}</ul><h3><Link href={`/events/${event.slug}`}>{event.title}</Link></h3><p>{event.summary}</p><Link href={`/events/${event.slug}`} className="theme-btn transparent-btn-2">Event details</Link></div></article></div>;
}

export function MediaCard({ episode, basePath, href }: { episode: MediaEpisode; basePath: string; href?: string }) {
  const destination = href ?? `${basePath}/${episode.slug}`;
  return <article className="cpmi-media-card"><div className="media-artwork"><Image src={episode.artwork.src} alt={episode.artwork.alt} width={720} height={720} sizes="(max-width: 767px) 100vw, 33vw" /><span className="media-kind"><i className={episode.mediaType === "AUDIO" ? "far fa-waveform" : "far fa-video"} aria-hidden="true" />{episode.mediaType === "AUDIO" ? "Listen" : "Watch"}</span>{episode.sample && <span className="sample-label">Preview</span>}</div><div className="media-card-content">{episode.seriesSlug && <span className="content-label">Series · {episode.seriesSlug.replaceAll("-", " ")}</span>}<h3><Link href={destination}>{episode.title}</Link></h3><p>{episode.description}</p>{episode.speaker && <span className="media-speaker">{episode.speaker}</span>}</div></article>;
}

export function CollectionCard({ collection, basePath }: { collection: MediaCollection; basePath: string }) {
  return <article className="cpmi-media-card"><div className="media-artwork"><Image src={collection.artwork.src} alt={collection.artwork.alt} width={720} height={720} sizes="(max-width: 767px) 100vw, 33vw" />{collection.sample && <span className="sample-label">Preview series</span>}</div><div className="media-card-content"><span className="content-label">{collection.kind.replaceAll("_", " ")}</span><h3><Link href={`${basePath}/${collection.slug}`}>{collection.title}</Link></h3><p>{collection.summary}</p></div></article>;
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const percent = campaignProgress(campaign) ?? 0;
  return <article className="popular-causes-card-items"><div className="thumb"><Image src={campaign.image.src} alt={campaign.image.alt} width={720} height={520} />{campaign.sample && <span className="sample-label">Campaign preview</span>}</div><div className="content"><span className="content-label">{campaign.category}</span><h3><Link href={`/give/campaigns/${campaign.slug}`}>{campaign.title}</Link></h3><p>{campaign.summary}</p>{campaign.goalMinor && <div className="progress-items"><div className="progress"><div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} /></div><div className="cause-amount"><span>{percent}% verified</span></div></div>}<Link href={`/give/campaigns/${campaign.slug}`} className="theme-btn">Campaign details</Link></div></article>;
}
