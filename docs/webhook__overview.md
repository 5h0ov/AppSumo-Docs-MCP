# Overview | AppSumo Licensing API (v2)

# [#](#overview) Overview

AppSumo uses webhooks to notify partners when a license for their product is **purchased**, **activated**, **upgraded**, **downgraded**, or **deactivated**.

## [#](#what-is-a-webhook) What is a Webhook?

A webhook, or web callback, is a way for apps to send real-time data to other applications automatically. Unlike standard APIs that require constant polling, webhooks push data immediately when events happen, making them more efficient.

## [#](#appsumo-webhook-event-types) AppSumo Webhook Event Types

AppSumo sends the following webhook events related to your product’s licenses:

*   `purchase`: Triggered when a user buys your product.
*   `activate`: Triggered when a user activates their purchase.
*   `upgrade`: Triggered when a user upgrades their product tier (e.g., Tier 1 to Tier 2).
*   `downgrade`: Triggered when a user downgrades their product tier (e.g., Tier 2 to Tier 1).
*   `migrate` (add-on specific): Triggered during both `upgrade` and `downgrade` events **specifically related to deal add-ons**. This event serves as a ledger record, assuming the association with the newly upgraded or downgraded parent deal has already been established through the `upgrade`/`downgrade` webhook.
*   `deactivate`: Triggered when a license is deactivated, often due to a refund or cancellation.

### [#](#test-webhooks) Test Webhooks

Test webhooks validate your webhook URL and include `"test": true` in the `POST` request. These should not trigger actions within your product but should respond successfully to confirm your URL is working.

← [Next steps](/licensing/licensing__next_steps.html) [Getting started](/webhook/webhook__getting_started.html) →
