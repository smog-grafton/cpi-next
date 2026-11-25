"use client";

import { useMediaPlayer } from "./MediaProvider";

export function RadioPlayButton({ className = "theme-btn" }: { className?: string }) {
  const player = useMediaPlayer();
  const playing = player.state === "PLAYING";
  return (
    <button type="button" className={className} onClick={() => (playing ? player.pause() : void player.play())} aria-pressed={playing}>
      <i className={playing ? "fas fa-pause" : "fas fa-play"} aria-hidden="true" />
      {playing ? " Pause radio" : player.configured ? " Listen live" : " Radio status"}
    </button>
  );
}
