"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMediaPlayer } from "./MediaProvider";

function stateLabel(state: ReturnType<typeof useMediaPlayer>["state"], configured: boolean) {
  if (state === "PLAYING") return "Live";
  if (state === "LOADING") return "Connecting";
  if (state === "ERROR") return "Retry";
  return configured ? "Ready" : "Preview";
}

export function GlobalMediaPlayer() {
  const player = useMediaPlayer();
  const pathname = usePathname();
  const hidden = pathname === "/radio";
  const playing = player.state === "PLAYING";

  useEffect(() => {
    document.body.classList.toggle("has-radio-dock", !hidden);
    return () => document.body.classList.remove("has-radio-dock");
  }, [hidden]);

  if (hidden) return null;

  return (
    <aside className="global-media-player" aria-label="Persistent CPMI radio player">
      <Link href="/radio" className="player-identity" aria-label={`Listen to ${player.stationName}`}>
        {/* Runtime artwork may be a local path or an approved remote station image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="player-artwork" src={player.artwork} alt="" />
        <div className="player-copy">
          <span className="player-station-line">
            <span className="player-kicker">{player.stationName}</span>
            <span className={`player-live-badge${playing ? " is-live" : ""}`}>
              <i aria-hidden="true" /> {stateLabel(player.state, player.configured)}
            </span>
          </span>
          <strong>{player.error && !player.configured ? "Currently off air" : player.streamName}</strong>
        </div>
      </Link>

      <div className="player-status" aria-live="polite">
        {player.error ?? (playing ? "Listening live" : player.configured ? "Press play to listen" : "Off air")}
      </div>

      <div className="player-controls">
        <button type="button" className="player-icon-button" onClick={() => player.setMuted(!player.muted)} aria-label={player.muted ? "Unmute radio" : "Mute radio"}>
          <i className={player.muted ? "fas fa-volume-mute" : "fas fa-volume-up"} aria-hidden="true" />
        </button>
        <label className="volume-control">
          <span className="visually-hidden">Radio volume</span>
          <input type="range" min="0" max="1" step="0.05" value={player.volume} onChange={(event) => player.setVolume(Number(event.target.value))} />
        </label>
        <button type="button" className={`player-main-button${playing ? " is-playing" : ""}`} onClick={() => (playing ? player.pause() : void player.play())} aria-label={playing ? "Pause CPMI radio" : "Play CPMI radio"} disabled={player.state === "LOADING"}>
          <span className="play-pulse" aria-hidden="true" />
          <i className={playing ? "fas fa-pause" : "fas fa-play"} aria-hidden="true" />
        </button>
      </div>

      <Link href="/radio" className="player-detail-link" aria-label="Open CPMI Radio">
        <span>Open radio</span><i className="far fa-arrow-up-right" aria-hidden="true" />
      </Link>
    </aside>
  );
}
