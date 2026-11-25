# Donation workflow

## Donor journey

1. Choose an approved giving purpose or campaign.
2. Enter an amount.
3. Select a server-configured manual payment method.
4. Read the approved transfer instructions and complete the transfer outside the site.
5. Provide the transaction reference, optional contact information, and optional JPG/PNG/PDF evidence.
6. Receive a site reference with status `PENDING`.
7. Revisit the confirmation URL to view the review state.

If no approved method exists, the workflow stops at step 3. The application never invents mobile-money, bank, or card information.

## Finance review

Only `FINANCE_REVIEWER` and `SUPER_ADMIN` roles can access donation records or the review API. A reviewer compares the submission with actual settlement records, then:

- confirms it only after settlement is independently verified; or
- rejects it with a recorded reason.

An uploaded screenshot is supporting material, never proof of settlement. Card numbers, PINs, and mobile-money PINs must never be requested or stored.

## Campaign totals

Public totals in database mode are derived from `CONFIRMED` donation rows grouped by campaign. Pending and rejected rows are excluded. Editorial `verifiedRaisedMinor` values are overwritten by this aggregation to prevent a content payload from overstating funds.

## Evidence storage

- Maximum size: 4 MB.
- Types: JPEG, PNG, PDF.
- Storage: `storage/private/donation-evidence` with randomised names.
- The directory must be backed up securely, excluded from public static hosting, protected by retention rules, and accessible only through an authorised future retrieval endpoint.

## Configuration

The initial environment-backed method uses `GIVING_METHOD_LABEL` and `GIVING_INSTRUCTIONS`. The schema also includes `payment_methods` for a future dedicated settings editor. Keep payment details in server secrets/configuration and have finance leadership approve every change.
