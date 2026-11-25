import {
  bigint,
  boolean,
  datetime,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

const timestamps = {
  createdAt: datetime("created_at", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime("updated_at", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
};

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    email: varchar("email", { length: 191 }).notNull(),
    name: varchar("name", { length: 191 }).notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    role: mysqlEnum("role", [
      "CONTENT_EDITOR",
      "FINANCE_REVIEWER",
      "MINISTRY_ADMIN",
      "SUPER_ADMIN",
    ]).notNull(),
    active: boolean("active").notNull().default(true),
    ...timestamps,
  },
  (table) => [uniqueIndex("users_email_unique").on(table.email)],
);

export const contentEntries = mysqlTable(
  "content_entries",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    kind: varchar("kind", { length: 64 }).notNull(),
    slug: varchar("slug", { length: 191 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    status: mysqlEnum("status", ["DRAFT", "REVIEW", "PUBLISHED", "ARCHIVED"])
      .notNull()
      .default("DRAFT"),
    payload: json("payload").notNull(),
    publishedAt: datetime("published_at", { mode: "date" }),
    createdBy: varchar("created_by", { length: 36 }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("content_kind_slug_unique").on(table.kind, table.slug),
    index("content_status_kind_idx").on(table.status, table.kind),
  ],
);

export const siteSettingsTable = mysqlTable(
  "site_settings",
  {
    settingKey: varchar("setting_key", { length: 191 }).primaryKey(),
    value: json("value").notNull(),
    isPublic: boolean("is_public").notNull().default(false),
    updatedBy: varchar("updated_by", { length: 36 }),
    updatedAt: datetime("updated_at", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  },
);

export const mediaAssets = mysqlTable(
  "media_assets",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    path: varchar("path", { length: 512 }).notNull(),
    mimeType: varchar("mime_type", { length: 127 }).notNull(),
    originalName: varchar("original_name", { length: 255 }).notNull(),
    altText: varchar("alt_text", { length: 512 }).notNull(),
    sizeBytes: bigint("size_bytes", { mode: "number", unsigned: true }).notNull(),
    uploadedBy: varchar("uploaded_by", { length: 36 }).notNull(),
    ...timestamps,
  },
);

export const formSubmissions = mysqlTable(
  "form_submissions",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    reference: varchar("reference", { length: 32 }).notNull(),
    formType: mysqlEnum("form_type", ["CONTACT", "PRAYER", "VISIT", "EVENT"])
      .notNull(),
    payload: json("payload").notNull(),
    status: mysqlEnum("status", ["NEW", "IN_PROGRESS", "RESOLVED", "ARCHIVED"])
      .notNull()
      .default("NEW"),
    privatePastoral: boolean("private_pastoral").notNull().default(false),
    reviewedBy: varchar("reviewed_by", { length: 36 }),
    reviewedAt: datetime("reviewed_at", { mode: "date" }),
    createdAt: datetime("created_at", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("form_reference_unique").on(table.reference),
    index("form_type_status_idx").on(table.formType, table.status),
  ],
);

export const donationSubmissions = mysqlTable(
  "donation_submissions",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    reference: varchar("reference", { length: 32 }).notNull(),
    purposeId: varchar("purpose_id", { length: 64 }).notNull(),
    campaignSlug: varchar("campaign_slug", { length: 191 }),
    amountMinor: bigint("amount_minor", { mode: "number", unsigned: true }).notNull(),
    currency: varchar("currency", { length: 3 }).notNull(),
    paymentMethod: varchar("payment_method", { length: 64 }).notNull(),
    transactionReference: varchar("transaction_reference", { length: 191 }).notNull(),
    donorName: varchar("donor_name", { length: 191 }).notNull(),
    donorEmail: varchar("donor_email", { length: 191 }),
    donorPhone: varchar("donor_phone", { length: 64 }),
    evidencePath: varchar("evidence_path", { length: 512 }),
    status: mysqlEnum("status", ["PENDING", "CONFIRMED", "REJECTED"])
      .notNull()
      .default("PENDING"),
    reviewReason: text("review_reason"),
    reviewedBy: varchar("reviewed_by", { length: 36 }),
    reviewedAt: datetime("reviewed_at", { mode: "date" }),
    createdAt: datetime("created_at", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updated_at", { mode: "date" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("donation_reference_unique").on(table.reference),
    index("donation_status_campaign_idx").on(table.status, table.campaignSlug),
  ],
);

export const paymentMethods = mysqlTable(
  "payment_methods",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    label: varchar("label", { length: 191 }).notNull(),
    instructions: text("instructions").notNull(),
    active: boolean("active").notNull().default(false),
    sortOrder: int("sort_order").notNull().default(0),
    updatedBy: varchar("updated_by", { length: 36 }),
    ...timestamps,
  },
);
