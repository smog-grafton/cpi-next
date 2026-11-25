import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { EventCard } from "@/components/site/Cards";
import EmptyState from "@/components/site/EmptyState";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";
import { currentTimestamp } from "@/server/time";

export const metadata: Metadata = {
  title: "Events",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const { events } = await getPublicContent();
  const now = currentTimestamp();
  const upcoming = events.filter(
    (event) => new Date(event.startsAt).getTime() >= now,
  );
  const past = events.filter(
    (event) => new Date(event.startsAt).getTime() < now,
  );

  return (
    <>
      <PageBanner
        pageName="Events"
        pageTitle="Gather, worship, learn and serve together"
      />
      <section className="event-section section-padding">
        <div className="container">
          <SectionHeading eyebrow="Upcoming" title="Events and church gatherings" />
          {upcoming.length ? (
            <div className="row g-4">
              {upcoming.map((event, index) => (
                <EventCard event={event} index={index} key={event.slug} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="far fa-calendar-check"
              title="No verified upcoming events"
              message="Dates, service times, venues and registration links will appear after ministry approval."
              action={{ label: "Plan a visit", href: "/plan-your-visit" }}
            />
          )}
          {past.length > 0 && (
            <div className="past-events">
              <SectionHeading eyebrow="Archive" title="Past events" />
              <div className="row g-4">
                {past.map((event, index) => (
                  <EventCard event={event} index={index} key={event.slug} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
