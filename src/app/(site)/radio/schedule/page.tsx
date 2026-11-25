import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Radio schedule", alternates: { canonical: "/radio/schedule" } };

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const dayIndexes = [1, 2, 3, 4, 5, 6, 0];

export default async function SchedulePage() {
  const { schedule, radioProgrammes, settings } = await getPublicContent();
  return (
    <>
      <PageBanner pageName="Radio schedule" pageTitle="Your week on CPMI Radio" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Radio", href: "/radio" }, { label: "Schedule" }]} />
      <section className="schedule-page-section">
        <div className="container">
          <div className="schedule-heading"><div><span>{schedule.some((slot) => slot.sample) ? "Sample schedule" : "Weekly schedule"} · {settings.timezone}</span><h2>Find your programme</h2></div><div><Link href="/radio" className="theme-btn">Open player</Link><Link href="/radio/programmes" className="theme-btn transparent-btn-2">Programme guide</Link></div></div>
          <div className="weekly-schedule">
            {days.map((day, position) => {
              const slots = schedule.filter((slot) => slot.dayOfWeek === dayIndexes[position]);
              return (
                <section className="schedule-day" key={day}>
                  <header><span>{String(position + 1).padStart(2, "0")}</span><h3>{day}</h3></header>
                  <div>
                    {slots.length ? slots.map((slot) => {
                      const programme = radioProgrammes.find((item) => item.slug === slot.programmeSlug);
                      return <Link href={`/radio/programmes/${slot.programmeSlug}`} className="schedule-slot" key={slot.id}><time>{slot.startsAtLocal}<small>to {slot.endsAtLocal}</small></time><span><strong>{programme?.title ?? "CPMI Radio"}</strong><small>{programme?.summary}</small></span><i className="far fa-arrow-up-right" /></Link>;
                    }) : <div className="schedule-rest"><i className="far fa-moon-stars" /><span>No preview programme in this slot</span></div>}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
