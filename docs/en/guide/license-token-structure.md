# License Structure & Validation (Client Source of Truth)

> Applies to: License Manager API v1 and official SDKs
>
> Effective: 2026-08-18
>
> This page supersedes the former requirement to embed a product public key before first online activation.

License Manager protects licenses with RSA signatures. A signing public key belongs to a **product**: licenses issued for the same product are verified with that product's public key. The system does not create a separate key pair for every license.

## Where the public key comes from

| Scenario | Public-key source | Client action |
|---|---|---|
| First online activation, trial, or recovery | `public_key` returned with `license_file` | Verify the returned license with that key, then persist the verified pair |
| Heartbeat returns a new license | Product public key already stored locally | Fully validate the new license, then replace only the license file |
| Fully offline import | Product public key delivered in the same batch as the license | Validate the pair before persisting it |

Preloading or pinning a product public key is an optional hardening measure. It is not required for first online activation.

## First online acquisition

The activation, trial, and fingerprint-recovery responses can return both `license_file` and `public_key`. The client must:

1. Parse the returned product public key.
2. Base64-decode the license envelope.
3. Verify the signature over the original `data` UTF-8 bytes.
4. Check status, validity dates, and the hardware fingerprint.
5. Persist the license and public key as a pair only after all checks pass.

Do not treat `public_key` as an ignorable compatibility field.

## License envelope

After Base64 decoding, the license envelope contains:

| Field | Type | Description |
|---|---|---|
| `algorithm` | String | Signature algorithm, currently `RSA-PSS-SHA256` |
| `data` | String | Original serialized JSON payload |
| `signature` | String | Base64 signature over the original `data` bytes |

The payload can include `license_key`, `product_code`, `status`, validity dates, `hardware_fingerprint`, `deployment_type`, `feature_config`, `usage_limits`, and `custom_parameters`.

Never parse and reserialize `data` before signature verification, because that may change the signed bytes.

## Validation order

1. Select the product public key paired with the current license.
2. Decode and parse the license envelope.
3. Require a supported signature algorithm.
4. Verify the signature over the original `data` string.
5. Parse the payload only after signature verification succeeds.
6. Require an allowed status and a valid time window.
7. Match the current hardware fingerprint.
8. Apply product-specific features and limits.
9. Enable protected behavior or replace a stored license only after every check passes.

A valid signature proves issuer and integrity; it does not replace status, time, or device-binding checks.

## Heartbeat license updates

A heartbeat may return a new `license_file`, but it does not return a new public key. Verify the new license with the locally stored product public key and run the same complete validation used after activation. Replace the old license atomically only when validation succeeds; otherwise retain the old license and key.

## Fully offline delivery

A fully offline client cannot acquire a key from an online response. Deliver at least the license file and its product public key together. The client validates and persists that pair using the same signature, status, time, and hardware checks.
