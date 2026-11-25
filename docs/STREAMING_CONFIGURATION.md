# Streaming configuration

## Radio

Set server environment values:

```env
RADIO_PRIMARY_STREAM_URL=https://stream.example.org/live.mp3
RADIO_FALLBACK_STREAM_URL=https://backup.example.org/live.m3u8
RADIO_STATION_NAME="CPMI Radio"
RADIO_STREAM_NAME="Kingdom Radio Stream"
RADIO_ARTWORK_URL=/assets/img/brand/cpmi/cpmi-radio-artwork.png
```

Supported behavior:

- Browser-supported remote audio such as MP3/AAC through the native audio element.
- HLS `.m3u8` through Hls.js where Media Source Extensions are available, or native HLS where supported by the browser.
- Primary-to-fallback retry on a fatal media error.
- Persistent state because the provider is mounted in the root layout.
- An always-visible desktop/mobile dock on every public page except `/radio`, where the full listening console takes over.
- Station artwork, station name, playback state and a default stream title before any metadata source is connected.
- User-initiated playback only; sound never autoplays.

The site does not label a source live merely because a schedule exists. When URLs are blank, the player shows a polished unconfigured state. Validate HTTPS, MIME types, cross-origin headers, range requests, and long-running connection behavior from the production hostname.

## Live video

Use one approved source:

```env
LIVE_VIDEO_HLS_URL=https://video.example.org/live/index.m3u8
LIVE_VIDEO_EMBED_URL=https://www.youtube.com/embed/APPROVED_ID
```

HLS is preferred when direct playback controls are required. Embeds are limited to the allowlist implemented by `VideoPlayer`; never place arbitrary visitor-supplied HTML in configuration.

## Homepage video

```env
HOMEPAGE_HERO_VIDEO_URL=https://cdn.example.org/cpmi/hero.mp4
```

The hero keeps the generated still image as a poster/fallback. Video is muted, inline, decorative, and must be optimised for mobile delivery. Do not configure it until bandwidth, licence, crop, and motion approvals are complete.

## Programme metadata

Programme and schedule content is stored independently from stream health. Publish `RADIO_PROGRAMME`, `RADIO_EPISODE`, and `SCHEDULE_SLOT` entries through the content editor only after names, hosts, local time, and timezone are verified.
