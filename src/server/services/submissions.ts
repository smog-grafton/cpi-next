import "server-only";

import { randomBytes, randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { desc, eq } from "drizzle-orm";
import type { DonationStatus } from "@/domain/models";
import { checkDatabaseConnection, getDatabase } from "@/server/db/client";
import { donationSubmissions, formSubmissions } from "@/server/db/schema";
import type {
  ContactInput,
  DonationInput,
  EventRegistrationInput,
  PrayerInput,
  VisitInput,
} from "@/server/validation/forms";

type FormType = "CONTACT" | "PRAYER" | "VISIT" | "EVENT";
type FormPayload = ContactInput | PrayerInput | VisitInput | EventRegistrationInput;

function createReference(prefix: string): string {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `${prefix}-${date}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function createFormSubmission(
  formType: FormType,
  payload: FormPayload,
  privatePastoral = false,
): Promise<string> {
  if (!(await checkDatabaseConnection())) {
    throw new Error("PERSISTENCE_UNAVAILABLE");
  }
  const reference = createReference("CPMI");
  const { website: _website, ...storedPayload } = payload;
  void _website;
  await getDatabase().insert(formSubmissions).values({
    id: randomUUID(),
    reference,
    formType,
    payload: storedPayload,
    privatePastoral,
  });
  return reference;
}

export interface GivingConfiguration {
  methods: Array<{ id: string; label: string; instructions: string }>;
  currency: string;
}

export function getGivingConfiguration(): GivingConfiguration {
  const label = process.env.GIVING_METHOD_LABEL?.trim();
  const instructions = process.env.GIVING_INSTRUCTIONS?.trim();
  const configuredCurrency = process.env.GIVING_CURRENCY?.trim().toUpperCase();
  return {
    methods:
      label && instructions
        ? [{ id: "configured-manual", label, instructions }]
        : [],
    currency: configuredCurrency && /^[A-Z]{3}$/.test(configuredCurrency) ? configuredCurrency : "ZAR",
  };
}

const evidenceTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["application/pdf", ".pdf"],
]);

async function storeEvidence(file: File, reference: string): Promise<string> {
  if (file.size > 4 * 1024 * 1024) throw new Error("EVIDENCE_TOO_LARGE");
  const extension = evidenceTypes.get(file.type);
  if (!extension) throw new Error("EVIDENCE_TYPE_UNSUPPORTED");
  const directory = path.resolve(process.cwd(), "storage", "private", "donation-evidence");
  await mkdir(directory, { recursive: true });
  const filename = `${reference}-${randomBytes(8).toString("hex")}${extension}`;
  const destination = path.join(directory, filename);
  await writeFile(destination, Buffer.from(await file.arrayBuffer()), { flag: "wx" });
  return destination;
}

export async function createDonationSubmission(
  input: DonationInput,
  evidence?: File,
): Promise<string> {
  if (!(await checkDatabaseConnection())) throw new Error("PERSISTENCE_UNAVAILABLE");
  const giving = getGivingConfiguration();
  if (!giving.methods.some((method) => method.id === input.paymentMethod)) {
    throw new Error("PAYMENT_METHOD_UNAVAILABLE");
  }

  const reference = createReference("GIVE");
  let evidencePath: string | undefined;
  try {
    if (evidence && evidence.size > 0) evidencePath = await storeEvidence(evidence, reference);
    await getDatabase().insert(donationSubmissions).values({
      id: randomUUID(),
      reference,
      purposeId: input.purposeId,
      campaignSlug: input.campaignSlug || undefined,
      amountMinor: Math.round(input.amount * 100),
      currency: input.currency,
      paymentMethod: input.paymentMethod,
      transactionReference: input.transactionReference,
      donorName: input.donorName,
      donorEmail: input.donorEmail || undefined,
      donorPhone: input.donorPhone || undefined,
      evidencePath,
      status: "PENDING",
    });
    return reference;
  } catch (error) {
    if (evidencePath) await unlink(evidencePath).catch(() => undefined);
    throw error;
  }
}

export async function getDonationStatus(reference: string) {
  if (!(await checkDatabaseConnection())) return undefined;
  const [donation] = await getDatabase()
    .select({
      reference: donationSubmissions.reference,
      status: donationSubmissions.status,
      reviewReason: donationSubmissions.reviewReason,
      createdAt: donationSubmissions.createdAt,
      reviewedAt: donationSubmissions.reviewedAt,
    })
    .from(donationSubmissions)
    .where(eq(donationSubmissions.reference, reference))
    .limit(1);
  return donation;
}

export async function listDonationSubmissions() {
  if (!(await checkDatabaseConnection())) return [];
  return getDatabase()
    .select()
    .from(donationSubmissions)
    .orderBy(desc(donationSubmissions.createdAt))
    .limit(200);
}

export async function reviewDonation(
  reference: string,
  status: Exclude<DonationStatus, "PENDING">,
  reviewerId: string,
  reason?: string,
): Promise<boolean> {
  if (!(await checkDatabaseConnection())) throw new Error("PERSISTENCE_UNAVAILABLE");
  const result = await getDatabase()
    .update(donationSubmissions)
    .set({
      status,
      reviewReason: reason || null,
      reviewedBy: reviewerId,
      reviewedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(donationSubmissions.reference, reference));
  return result[0].affectedRows > 0;
}
