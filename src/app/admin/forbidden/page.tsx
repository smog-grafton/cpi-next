import Link from "next/link";
export default function ForbiddenPage() { return <main className="admin-message-page"><div><span className="content-label">Access restricted</span><h1>Your role cannot perform this operation.</h1><p>Server-side permissions protect content, finance and pastoral data independently.</p><Link href="/admin" className="theme-btn">Back to dashboard</Link></div></main>; }
