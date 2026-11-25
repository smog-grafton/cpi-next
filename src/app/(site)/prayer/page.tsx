import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import PrayerForm from "@/components/forms/PrayerForm";
import SectionHeading from "@/components/site/SectionHeading";

export const metadata: Metadata = { title: "Prayer request", robots: { index: true, follow: true }, alternates: { canonical: "/prayer" } };
export default function PrayerPage() { return <><PageBanner pageName="Prayer" pageTitle="You do not have to carry it alone" /><section className="section-padding prayer-page"><div className="container"><div className="row g-5"><div className="col-lg-5"><SectionHeading eyebrow="Request prayer" title="Share only what you are comfortable sharing" align="start" /><p>Submit anonymously or provide contact details if you would like a pastoral response. Sensitive requests are designed for protected pastoral access.</p><div className="scripture-reference-panel compact"><div><span>CPMI scriptural theme</span><h3>Matthew 11:28</h3></div></div></div><div className="col-lg-7"><PrayerForm /></div></div></div></section></>; }
