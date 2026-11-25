CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('CONTENT_EDITOR','FINANCE_REVIEWER','MINISTRY_ADMIN','SUPER_ADMIN') NOT NULL,
  `active` boolean NOT NULL DEFAULT true,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
);

CREATE TABLE IF NOT EXISTS `content_entries` (
  `id` varchar(36) NOT NULL,
  `kind` varchar(64) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` enum('DRAFT','REVIEW','PUBLISHED','ARCHIVED') NOT NULL DEFAULT 'DRAFT',
  `payload` json NOT NULL,
  `published_at` datetime NULL,
  `created_by` varchar(36) NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_kind_slug_unique` (`kind`,`slug`),
  KEY `content_status_kind_idx` (`status`,`kind`)
);

CREATE TABLE IF NOT EXISTS `site_settings` (
  `setting_key` varchar(191) NOT NULL,
  `value` json NOT NULL,
  `is_public` boolean NOT NULL DEFAULT false,
  `updated_by` varchar(36) NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`setting_key`)
);

CREATE TABLE IF NOT EXISTS `media_assets` (
  `id` varchar(36) NOT NULL,
  `path` varchar(512) NOT NULL,
  `mime_type` varchar(127) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `alt_text` varchar(512) NOT NULL,
  `size_bytes` bigint unsigned NOT NULL,
  `uploaded_by` varchar(36) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `form_submissions` (
  `id` varchar(36) NOT NULL,
  `reference` varchar(32) NOT NULL,
  `form_type` enum('CONTACT','PRAYER','VISIT','EVENT') NOT NULL,
  `payload` json NOT NULL,
  `status` enum('NEW','IN_PROGRESS','RESOLVED','ARCHIVED') NOT NULL DEFAULT 'NEW',
  `private_pastoral` boolean NOT NULL DEFAULT false,
  `reviewed_by` varchar(36) NULL,
  `reviewed_at` datetime NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `form_reference_unique` (`reference`),
  KEY `form_type_status_idx` (`form_type`,`status`)
);

CREATE TABLE IF NOT EXISTS `donation_submissions` (
  `id` varchar(36) NOT NULL,
  `reference` varchar(32) NOT NULL,
  `purpose_id` varchar(64) NOT NULL,
  `campaign_slug` varchar(191) NULL,
  `amount_minor` bigint unsigned NOT NULL,
  `currency` varchar(3) NOT NULL,
  `payment_method` varchar(64) NOT NULL,
  `transaction_reference` varchar(191) NOT NULL,
  `donor_name` varchar(191) NOT NULL,
  `donor_email` varchar(191) NULL,
  `donor_phone` varchar(64) NULL,
  `evidence_path` varchar(512) NULL,
  `status` enum('PENDING','CONFIRMED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `review_reason` text NULL,
  `reviewed_by` varchar(36) NULL,
  `reviewed_at` datetime NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `donation_reference_unique` (`reference`),
  KEY `donation_status_campaign_idx` (`status`,`campaign_slug`)
);

CREATE TABLE IF NOT EXISTS `payment_methods` (
  `id` varchar(64) NOT NULL,
  `label` varchar(191) NOT NULL,
  `instructions` text NOT NULL,
  `active` boolean NOT NULL DEFAULT false,
  `sort_order` int NOT NULL DEFAULT 0,
  `updated_by` varchar(36) NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `schema_migrations` (
  `name` varchar(255) NOT NULL,
  `applied_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`name`)
);
