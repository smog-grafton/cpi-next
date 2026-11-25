import { describe, expect, it } from "vitest";
import {
  contactSchema,
  donationReviewSchema,
  donationSchema,
  prayerSchema,
} from "@/server/validation/forms";

describe("public form validation", () => {
  it("accepts a complete contact request", () => {
    expect(contactSchema.safeParse({
      name: "Grace Visitor",
      email: "grace@example.com",
      contactPreference: "EMAIL",
      subject: "Plan a visit",
      message: "I would like to know when verified gathering times are published.",
      consent: true,
      website: "",
    }).success).toBe(true);
  });

  it("rejects honeypot and short contact submissions", () => {
    expect(contactSchema.safeParse({
      name: "X",
      email: "not-an-email",
      contactPreference: "EMAIL",
      subject: "Hi",
      message: "Too short",
      consent: true,
      website: "bot",
    }).success).toBe(false);
  });

  it("requires contact details when a prayer response is requested", () => {
    const result = prayerSchema.safeParse({
      anonymous: true,
      responseRequested: true,
      request: "Please pray with me about an important family situation.",
      consent: true,
      website: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("donation validation", () => {
  it("normalises currency and accepts only positive contributions", () => {
    const result = donationSchema.safeParse({
      purposeId: "general-ministry",
      amount: "25000",
      currency: "ugx",
      paymentMethod: "configured-manual",
      transactionReference: "TX-123",
      donorName: "Test Donor",
      consent: true,
      website: "",
    });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.currency).toBe("UGX");
  });

  it("requires a reason when rejecting a submission", () => {
    expect(donationReviewSchema.safeParse({ status: "REJECTED" }).success).toBe(false);
    expect(donationReviewSchema.safeParse({
      status: "REJECTED",
      reason: "Reference could not be verified.",
    }).success).toBe(true);
  });
});
