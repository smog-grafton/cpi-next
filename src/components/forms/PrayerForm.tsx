"use client";

import { useState, type FormEvent } from "react";
import { FormStatus, type FormResponse } from "./FormStatus";

export default function PrayerForm() {
  const [anonymous, setAnonymous] = useState(false);
  const [responseRequested, setResponseRequested] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState<FormResponse | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setResponse(null);
    const form = event.currentTarget; const data = new FormData(form);
    const payload = { anonymous, name: data.get("name") || undefined, email: data.get("email") || undefined, phone: data.get("phone") || undefined, responseRequested, request: data.get("request"), consent: data.get("consent") === "on", website: data.get("website") };
    try { const result = await fetch("/api/forms/prayer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const body = await result.json() as FormResponse; setResponse(body); if (body.ok) form.reset(); }
    catch { setResponse({ ok: false, message: "The network request failed. No information was saved." }); }
    finally { setSubmitting(false); }
  }
  return <form className="cpmi-form prayer-form" onSubmit={submit} noValidate><div className="privacy-callout"><i className="far fa-lock" /><div><strong>Handled privately</strong><p>Prayer requests are never published and should only be accessible to authorised pastoral administrators.</p></div></div><label className="check-control"><input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} /><span>Submit without my name</span></label><div className="row g-4 mt-1">{!anonymous && <div className="col-12"><label htmlFor="prayer-name">Name</label><input id="prayer-name" name="name" required minLength={2} autoComplete="name" /></div>}<div className="col-md-6"><label htmlFor="prayer-email">Email <span>optional</span></label><input id="prayer-email" name="email" type="email" autoComplete="email" /></div><div className="col-md-6"><label htmlFor="prayer-phone">Phone <span>optional</span></label><input id="prayer-phone" name="phone" type="tel" autoComplete="tel" /></div><div className="col-12"><label htmlFor="prayer-request">How can we pray with you?</label><textarea id="prayer-request" name="request" required minLength={20} rows={8} /></div><div className="visually-hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div><div className="col-12"><label className="check-control"><input type="checkbox" checked={responseRequested} onChange={(event) => setResponseRequested(event.target.checked)} /><span>I would like a pastoral response</span></label><label className="check-control"><input type="checkbox" name="consent" required /><span>I understand this sensitive request will be stored for pastoral follow-up and retained according to ministry policy.</span></label></div><div className="col-12"><FormStatus response={response} submitting={submitting} /><button className="theme-btn" type="submit" disabled={submitting}>Send prayer request <i className="far fa-heart" /></button></div></div></form>;
}
