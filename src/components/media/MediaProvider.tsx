"use client";

import Hls from "hls.js";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type StreamState = "UNCONFIGURED" | "IDLE" | "LOADING" | "READY" | "PLAYING" | "PAUSED" | "ERROR";
interface MediaContextValue {
  configured: boolean;
  engaged: boolean;
  stationName: string;
  streamName: string;
  artwork: string;
  state: StreamState;
  muted: boolean;
  volume: number;
  error: string | null;
  play: () => Promise<void>;
  pause: () => void;
  retry: () => Promise<void>;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
}
const MediaContext = createContext<MediaContextValue | null>(null);

export function MediaProvider({ children, primaryStream, fallbackStream, stationName, streamName, artwork }: {
  children: ReactNode;
  primaryStream?: string;
  fallbackStream?: string;
  stationName: string;
  streamName: string;
  artwork: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const attemptedFallback = useRef(false);
  const initialVolume = 0.8;
  const [engaged, setEngaged] = useState(false);
  const [state, setState] = useState<StreamState>(primaryStream ? "IDLE" : "UNCONFIGURED");
  const [muted, setMutedState] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);
  const [error, setError] = useState<string | null>(null);

  const attachSource = useCallback((source: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    hlsRef.current?.destroy();
    hlsRef.current = null;
    if (/\.m3u8($|\?)/i.test(source) && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      hls.loadSource(source);
      hls.attachMedia(audio);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) audio.dispatchEvent(new Event("error"));
      });
      hlsRef.current = hls;
    } else {
      audio.src = source;
      audio.load();
    }
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = initialVolume;
    audioRef.current = audio;
    const onLoadStart = () => setState("LOADING");
    const onCanPlay = () => setState(audio.paused ? "READY" : "PLAYING");
    const onPlaying = () => setState("PLAYING");
    const onPause = () => setState((current) => (current === "UNCONFIGURED" ? current : "PAUSED"));
    const onError = () => {
      if (!attemptedFallback.current && fallbackStream) {
        attemptedFallback.current = true;
        attachSource(fallbackStream);
        void audio.play().catch(() => undefined);
        return;
      }
      setState("ERROR");
      setError("The radio stream could not be reached. Check your connection and try again.");
    };
    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);
    return () => {
      audio.pause();
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
      hlsRef.current?.destroy();
      audioRef.current = null;
    };
  }, [attachSource, fallbackStream]);

  const play = useCallback(async () => {
    if (!primaryStream || !audioRef.current) {
      setState("UNCONFIGURED");
      setError("CPMI Radio is currently off air.");
      setEngaged(true);
      return;
    }
    setEngaged(true);
    setError(null);
    attemptedFallback.current = false;
    if (!audioRef.current.src && !hlsRef.current) attachSource(primaryStream);
    setState("LOADING");
    try {
      await audioRef.current.play();
    } catch {
      setState("ERROR");
      setError("Playback did not start. Select play again or check the browser's media permissions.");
    }
  }, [attachSource, primaryStream]);
  const pause = useCallback(() => audioRef.current?.pause(), []);
  const retry = useCallback(async () => {
    if (!audioRef.current) return;
    audioRef.current.removeAttribute("src");
    hlsRef.current?.destroy();
    hlsRef.current = null;
    await play();
  }, [play]);
  const setMuted = useCallback((nextMuted: boolean) => {
    setMutedState(nextMuted);
    if (audioRef.current) audioRef.current.muted = nextMuted;
  }, []);
  const setVolume = useCallback((nextVolume: number) => {
    const safeVolume = Math.min(1, Math.max(0, nextVolume));
    setVolumeState(safeVolume);
    if (audioRef.current) audioRef.current.volume = safeVolume;
  }, []);
  const value = useMemo<MediaContextValue>(() => ({
    configured: Boolean(primaryStream), engaged, stationName, streamName, artwork, state, muted, volume, error,
    play, pause, retry, setMuted, setVolume,
  }), [primaryStream, engaged, stationName, streamName, artwork, state, muted, volume, error, play, pause, retry, setMuted, setVolume]);
  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export function useMediaPlayer(): MediaContextValue {
  const context = useContext(MediaContext);
  if (!context) throw new Error("useMediaPlayer must be used inside MediaProvider.");
  return context;
}
