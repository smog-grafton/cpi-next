import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { CampaignCard } from "@/components/site/Cards";
import EmptyState from "@/components/site/EmptyState";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Giving campaigns", alternates: { canonical: "/give/campaigns" } };
export default async function CampaignsPage() { const { campaigns } = await getPublicContent(); return <><PageBanner pageName="Campaigns" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Give", href: "/give" }, { label: "Campaigns" }]} /><section className="section-padding section-bg"><div className="container"><SectionHeading eyebrow="Fundraising" title="Approved ministry campaigns" intro="Progress includes confirmed settlements only; pending references never increase a total." />{campaigns.length ? <div className="row g-4">{campaigns.map((campaign) => <div className="col-lg-4" key={campaign.slug}><CampaignCard campaign={campaign} /></div>)}</div> : <EmptyState title="No campaigns are active" message="The platform will display only verified goals, dates, descriptions and confirmed totals." />}</div></section></>; }
