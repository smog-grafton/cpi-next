import type { Campaign, DonationSubmission } from "./models";

type SettlementRecord = Pick<
  DonationSubmission,
  "amountMinor" | "campaignSlug" | "status"
>;

export function confirmedCampaignTotals(
  records: SettlementRecord[],
): Map<string, number> {
  const totals = new Map<string, number>();
  for (const record of records) {
    if (record.status !== "CONFIRMED" || !record.campaignSlug) continue;
    totals.set(
      record.campaignSlug,
      (totals.get(record.campaignSlug) ?? 0) + record.amountMinor,
    );
  }
  return totals;
}

export function applyConfirmedCampaignTotals(
  campaigns: Campaign[],
  records: SettlementRecord[],
): Campaign[] {
  const totals = confirmedCampaignTotals(records);
  return campaigns.map((campaign) => ({
    ...campaign,
    verifiedRaisedMinor: totals.get(campaign.slug) ?? 0,
  }));
}

export function campaignProgress(campaign: Campaign): number | undefined {
  if (!campaign.goalMinor || campaign.goalMinor <= 0) return undefined;
  return Math.min(
    100,
    Math.max(0, Math.round((campaign.verifiedRaisedMinor / campaign.goalMinor) * 100)),
  );
}
