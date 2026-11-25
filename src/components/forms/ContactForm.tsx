"use client";

import { useState, type FormEvent } from "react";
import { FormStatus, type FormResponse } from "./FormStatus";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState<FormResponse | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true); setResponse(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = { name: data.get("name"), email: data.get("email"), phone: data.get("phone"), contactPreference: data.get("contactPreference"), subject: data.get("subject"), message: data.get("message"), consent: data.get("consent") === "on", website: data.get("website") };
    try {
      const result = await fetch("/api/forms/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = await result.json() as FormResponse;
      setResponse(body);
      if (body.ok) form.reset();
    } catch { setResponse({ ok: false, message: "The network request failed. No information was saved." }); }
    finally { setSubmitting(false); }
  }
  return <form className="cpmi-form contact-form" onSubmit={submit} noValidate><div className="row g-4"><div className="col-md-6"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" required minLength={2} autoComplete="name" /></div><div className="col-md-6"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" required autoComplete="email" /></div><div className="col-md-6"><label htmlFor="contact-phone">Phone <span>optional</span></label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" /></div><div className="col-md-6"><label htmlFor="contact-preference">Preferred response</label><select id="contact-preference" name="contactPreference" defaultValue="EMAIL"><option value="EMAIL">Email</option><option value="PHONE">Phone</option></select></div><div className="col-12"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" required minLength={3} /></div><div className="col-12"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required minLength={20} rows={7} /></div><div className="visually-hidden" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div><div className="col-12"><label className="check-control"><input type="checkbox" name="consent" required /><span>I understand this information will be used to respond to my enquiry.</span></label></div><div className="col-12"><FormStatus response={response} submitting={submitting} /><button className="theme-btn" type="submit" disabled={submitting}>Send message <i className="far fa-arrow-right" /></button></div></div></form>;
}
