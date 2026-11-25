import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import VisitForm, { type VisitService } from "@/components/forms/VisitForm";
import SectionHeading from "@/components/site/SectionHeading";

export const metadata: Metadata = { title: "Plan your visit", alternates: { canonical: "/plan-your-visit" } };

export default function VisitPage() {
  const services: VisitService[] = [{
    id: "kingdom-citizens-celebration",
    label: "Kingdom Citizens Celebration",
    schedule: "Sunday · 9:00am–12:00pm",
    location: "Johannesburg, South Africa · request exact venue directions",
  }];
  return <><PageBanner pageName="Plan your visit" pageTitle="Come ready for worship, fellowship and practical Kingdom teaching." /><section className="section-padding visit-page"><div className="container"><div className="row g-5"><div className="col-lg-4"><SectionHeading eyebrow="Your first visit" title="A joyful welcome, prepared with care" align="start" /><div className="visit-expectations"><article><i className="far fa-clock" /><h4>Sunday gathering</h4><p>Kingdom Citizens Celebration runs from 9:00am to 12:00pm.</p></article><article><i className="far fa-music" /><h4>Worship and teaching</h4><p>Expect expressive worship, fellowship and practical teaching.</p></article><article><i className="far fa-location-dot" /><h4>Venue directions</h4><p>Use the form or contact page to request the current Johannesburg venue details.</p></article></div></div><div className="col-lg-8"><VisitForm services={services} /></div></div></div></section></>;
}
