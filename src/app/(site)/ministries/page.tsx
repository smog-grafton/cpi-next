import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/site/SectionHeading";
import { MinistryCard } from "@/components/site/Cards";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Ministries", description: "Explore CPMI teaching, media, community care and ministry development.", alternates: { canonical: "/ministries" } };
export default async function MinistriesPage() { const { ministries } = await getPublicContent(); return <><PageBanner pageName="Ministries" pageTitle="Faith expressed through teaching, leadership and service" /><section className="donation-section section-padding section-bg"><div className="container"><SectionHeading eyebrow="Find your place" title="Ministries and community programmes" intro="Each ministry page supports approved leaders, events, contacts and related resources as those details are verified." /><div className="row g-4">{ministries.map((ministry, index) => <MinistryCard ministry={ministry} index={index} key={ministry.slug} />)}</div></div></section></>; }
