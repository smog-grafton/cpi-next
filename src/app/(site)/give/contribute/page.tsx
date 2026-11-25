import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import DonationFlow from "@/components/forms/DonationFlow";
import { getPublicContent } from "@/server/repositories/content-repository";
import { getGivingConfiguration } from "@/server/services/submissions";

export const metadata: Metadata = { title: "Contribute", robots: { index: false, follow: false }, alternates: { canonical: "/give/contribute" } };
export default async function ContributePage() { const { givingPurposes } = await getPublicContent(); const configuration = getGivingConfiguration(); return <><PageBanner pageName="Contribute" pageTitle="Create a reviewable giving record" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Give", href: "/give" }, { label: "Contribute" }]} /><section className="section-padding contribute-page"><div className="container"><DonationFlow purposes={givingPurposes} methods={configuration.methods} currency={configuration.currency} /></div></section></>; }
