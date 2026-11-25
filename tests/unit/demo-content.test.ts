import { describe, expect, it } from "vitest";
import {
  campaigns,
  events,
  leaders,
  radioProgrammes,
  schedule,
  siteSettings,
} from "@/content/demo-content";

describe("truthful demonstration content", () => {
  it("contains the supplied vision, mission, history and Scripture references", () => {
    expect(siteSettings.vision).toContain("discovers and maximises");
    expect(siteSettings.mission).toContain("dominion leadership mandate");
    expect(siteSettings.scriptureReference).toBe("Matthew 11:28");
    expect(siteSettings.missionScriptures).toContain("Genesis 1:28");
    expect(siteSettings.foundedYear).toBe(2014);
    expect(siteSettings.founderName).toBe("Pastor Stephen Kabuye");
  });

  it("publishes the supplied founder and marks illustrative operational content as sample data", () => {
    expect(leaders.map((leader) => leader.name)).toContain("Pastor Stephen Kabuye");
    expect(events.length).toBeGreaterThan(0);
    expect(events.every((item) => item.sample)).toBe(true);
    expect(radioProgrammes.every((item) => item.sample)).toBe(true);
    expect(schedule.every((item) => item.sample)).toBe(true);
    expect(campaigns.every((item) => item.sample && item.verifiedRaisedMinor === 0)).toBe(true);
  });
});
