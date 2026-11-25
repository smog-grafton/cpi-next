import { describe, expect, it } from "vitest";
import {
  applyConfirmedCampaignTotals,
  campaignProgress,
  confirmedCampaignTotals,
} from "@/domain/campaigns";
import type { Campaign } from "@/domain/models";

const campaign: Campaign = {
  slug: "media-project",
  title: "Media project",
  summary: "Test campaign",
  description: [],
  category: "Media",
  goalMinor: 100_000,
  verifiedRaisedMinor: 99_999,
  currency: "UGX",
  image: { src: "/test.jpg", alt: "Test" },
  status: "PUBLISHED",
};

describe("verified campaign totals", () => {
  const records = [
    { campaignSlug: "media-project", amountMinor: 20_000, status: "CONFIRMED" as const },
    { campaignSlug: "media-project", amountMinor: 80_000, status: "PENDING" as const },
    { campaignSlug: "media-project", amountMinor: 50_000, status: "REJECTED" as const },
  ];

  it("excludes pending and rejected submissions", () => {
    expect(confirmedCampaignTotals(records).get("media-project")).toBe(20_000);
  });

  it("overwrites editorial totals with confirmed settlement data", () => {
    const [updated] = applyConfirmedCampaignTotals([campaign], records);
    expect(updated?.verifiedRaisedMinor).toBe(20_000);
    expect(updated && campaignProgress(updated)).toBe(20);
  });

  it("caps rendered progress at 100 percent", () => {
    expect(campaignProgress({ ...campaign, verifiedRaisedMinor: 150_000 })).toBe(100);
  });
});
