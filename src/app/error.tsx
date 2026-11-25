"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) { useEffect(() => { console.error(error); }, [error]); return <main id="main-content" className="error-page"><div><span className="content-label">Something went wrong</span><h1>This page could not be completed.</h1><p>Try the request again. If the problem continues, return to the homepage.</p><button type="button" className="theme-btn" onClick={reset}>Try again</button></div></main>; }
