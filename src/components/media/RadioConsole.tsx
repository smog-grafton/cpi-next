"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useMediaPlayer } from "./MediaProvider";

export default function RadioConsole({ featuredProgramme }: { featuredProgramme?: string }) {
  const player = useMediaPlayer();
  const playing = player.state === "PLAYING";
  const status = playing ? "Live now" : player.state === "LOADING" ? "Connecting" : player.configured ? "Ready to play" : "Preview mode";

  return (
    <section className="radio-console" aria-label="CPMI Radio listening console">
      <div className="radio-console-artwork">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={player.artwork} alt={`${player.stationName} artwork`} />
        <span className={`console-status${playing ? " is-live" : ""}`}><i aria-hidden="true" />{status}</span>
      </div>
      <div className="radio-console-main">
        <div className="console-title-row">
          <div><span>{player.stationName}</span><h1>{player.streamName}</h1></div>
          <Link href="/radio/schedule">Full schedule <i className="far fa-arrow-right" /></Link>
        </div>
        <p className="console-programme">{featuredProgramme || "Faith, purpose and Kingdom teaching"}</p>
        <div className={`console-waveform${playing ? " is-playing" : ""}`} aria-hidden="true">
          {Array.from({ length: 34 }, (_, index) => <i key={index} style={{ "--bar": index % 7 } as CSSProperties} />)}
        </div>
        <div className="console-controls">
          <button type="button" className={`console-play-button${playing ? " is-playing" : ""}`} onClick={() => (playing ? player.pause() : void player.play())} disabled={player.state === "LOADING"} aria-label={playing ? "Pause CPMI Radio" : "Play CPMI Radio"}>
            <span aria-hidden="true" /><i className={playing ? "fas fa-pause" : "fas fa-play"} aria-hidden="true" />
          </button>
          <div className="console-volume">
            <button type="button" onClick={() => player.setMuted(!player.muted)} aria-label={player.muted ? "Unmute radio" : "Mute radio"}><i className={player.muted ? "fas fa-volume-mute" : "fas fa-volume-up"} /></button>
            <input aria-label="Radio volume" type="range" min="0" max="1" step="0.05" value={player.volume} onChange={(event) => player.setVolume(Number(event.target.value))} />
          </div>
          <span className="console-feedback" aria-live="polite">{player.error}</span>
        </div>
      </div>
    </section>
  );
}
