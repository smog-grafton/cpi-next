"use client";

import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

export default function VideoPlayer({ hlsUrl, embedUrl, poster = "/assets/img/cta-video.jpg" }: { hlsUrl?: string; embedUrl?: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null); const [error, setError] = useState<string | null>(null); const [loading, setLoading] = useState(Boolean(hlsUrl));
  useEffect(() => { const video = videoRef.current; if (!video || !hlsUrl) return; let hls: Hls | undefined; const ready = () => setLoading(false); const fail = () => { setLoading(false); setError("The video source could not be reached. Try again later or choose a recorded message."); }; video.addEventListener("canplay", ready); video.addEventListener("error", fail); if (video.canPlayType("application/vnd.apple.mpegurl")) { video.src = hlsUrl; } else if (Hls.isSupported()) { hls = new Hls({ enableWorker: true }); hls.loadSource(hlsUrl); hls.attachMedia(video); hls.on(Hls.Events.ERROR, (_event, data) => { if (data.fatal) fail(); }); } else fail(); return () => { video.removeEventListener("canplay", ready); video.removeEventListener("error", fail); hls?.destroy(); }; }, [hlsUrl]);
  if (embedUrl) return <div className="video-frame"><iframe src={embedUrl} title="CPMI video broadcast" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>;
  if (!hlsUrl) return <div className="video-offline-state" style={{ backgroundImage: `url("${poster}")` }}><div className="offline-play-mark"><i className="fas fa-play" /></div><div className="offline-video-copy"><span>Off air</span><h2>The next broadcast will play here.</h2><p>Choose a message below while you wait.</p></div><div className="offline-video-rail"><i className="far fa-signal-stream-slash" /> CPMI Watch</div></div>;
  return <div className="video-frame native-video-frame">{loading && <div className="media-loading"><i className="far fa-spinner-third fa-spin" /> Connecting to video…</div>}<video ref={videoRef} controls playsInline poster={poster} preload="metadata" />{error && <div className="media-error" role="alert">{error}</div>}</div>;
}
