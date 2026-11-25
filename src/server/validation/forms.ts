import { z } from "zod";

const optionalEmail = z.union([z.literal(""), z.email().max(191)]).optional();
const optionalPhone = z.union([z.literal(""), z.string().trim().min(7).max(64)]).optional();
const honeypot = z.string().max(0, "Automated submission rejected.").optional().default("");

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(191),
  phone: optionalPhone,
  contactPreference: z.enum(["EMAIL", "PHONE"]),
  subject: z.string().trim().min(3).max(180),
  message: z.string().trim().min(20).max(5_000),
  consent: z.literal(true),
  website: honeypot,
});

export const prayerSchema = z
  .object({
    anonymous: z.boolean(),
    name: z.string().trim().max(120).optional(),
    email: optionalEmail,
    phone: optionalPhone,
    responseRequested: z.boolean(),
    request: z.string().trim().min(20).max(8_000),
    consent: z.literal(true),
    website: honeypot,
  })
  .superRefine((value, context) => {
    if (!value.anonymous && (!value.name || value.name.length < 2)) {
      context.addIssue({ code: "custom", path: ["name"], message: "Enter your name or submit anonymously." });
    }
    if (value.responseRequested && !value.email && !value.phone) {
      context.addIssue({
        code: "custom",
        path: ["email"],
        message: "Provide an email address or phone number if you would like a response.",
      });
    }
  });

export const visitSchema = z.object({
  serviceId: z.string().trim().min(1).max(64),
  name: z.string().trim().min(2).max(120),
  email: optionalEmail,
  phone: optionalPhone,
  adults: z.number().int().min(1).max(20),
  children: z.number().int().min(0).max(20),
  accessibilityNotes: z.string().trim().max(1_000).optional(),
  followUpRequested: z.boolean(),
  consent: z.literal(true),
  website: honeypot,
});

export const eventRegistrationSchema = z.object({
  eventSlug: z.string().trim().min(1).max(191),
  name: z.string().trim().min(2).max(120),
  email: z.email().max(191),
  phone: optionalPhone,
  attendees: z.number().int().min(1).max(20),
  notes: z.string().trim().max(1_000).optional(),
  consent: z.literal(true),
  website: honeypot,
});

export const donationSchema = z.object({
  purposeId: z.string().trim().min(1).max(64),
  campaignSlug: z.string().trim().max(191).optional(),
  amount: z.coerce.number().positive().max(100_000_000),
  currency: z.string().trim().length(3).transform((value) => value.toUpperCase()),
  paymentMethod: z.string().trim().min(1).max(64),
  transactionReference: z.string().trim().min(3).max(191),
  donorName: z.string().trim().min(2).max(191),
  donorEmail: optionalEmail,
  donorPhone: optionalPhone,
  consent: z.literal(true),
  website: honeypot,
});

export const donationReviewSchema = z
  .object({
    status: z.enum(["CONFIRMED", "REJECTED"]),
    reason: z.string().trim().max(2_000).optional(),
  })
  .superRefine((value, context) => {
    if (value.status === "REJECTED" && (!value.reason || value.reason.length < 5)) {
      context.addIssue({
        code: "custom",
        path: ["reason"],
        message: "A clear rejection reason is required.",
      });
    }
  });

export type ContactInput = z.infer<typeof contactSchema>;
export type PrayerInput = z.infer<typeof prayerSchema>;
export type VisitInput = z.infer<typeof visitSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type DonationInput = z.infer<typeof donationSchema>;
