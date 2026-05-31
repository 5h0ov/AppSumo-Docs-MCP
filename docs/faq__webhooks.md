# Webhooks FAQ | AppSumo Licensing API (v2)

# [#](#webhooks-faq) Webhooks FAQ

## [#](#how-to-identify-a-user-s-tier) How to Identify a User's `Tier`

**What's Happening**:

If you're unsure how to assign the correct `tier` to a customers license, here's a breakdown below.

*   Use the `tier` integer from webhooks to determine the user's tier. This is the one true source.
    
*   For detailed information, see [Webhook Object](/webhook/webhook__connect.html#webhook-object)
    

If your product offers **multiple tiers** on AppSumo (e.g., 3 tiers), and depending on which `tier` the customer purchased, the Webhook will return the `tier` integer as:

```
{
    "tier": 1,
}
```

```
{
    "tier": 2,
}
```

```
{
    "tier": 3,
}
```

## [#](#appsumo-event-sequence-customer-journey-overview) AppSumo Event Sequence: Customer Journey Overview

**What's Happening**:

If you're uncertain about the **flow** from the customer’s perspective, here’s a step-by-step breakdown:

**1\. `Purchase` **Event Webhook****

*   Triggered after a user successfully buys a license for your product.
*   See [Purchase events](/webhook/webhook__connect.html#purchase-events)

**2\. `Activate` **Event Webhook****

*   Sent when the user attempts to `activate` their license, starting the OAuth process.
*   See [Activate events](/webhook/webhook__connect.html#activate-events)

**3\. **OAuth Flow****

*   AppSumo initiates the OAuth steps to send the user to your OAuth `redirect_uri` including:
    *   Extracting the `code`
    *   Fetching a temporoary `access_token`
    *   Fetching the users license
*   See [Connecting to AppSumo (OAuth)](/licensing/licensing__connect.html#connecting-to-appsumo-oauth)

**4\. **User Lands on Your** `redirect_uri`**

*   The user reaches your landing page to complete required information and finalize the sign-up process, including providing their email and new account password.
*   See [Best practice example (`redirect_uri`)](/licensing/licensing__getting_started.html#best-practice-example)

**5\. `Upgrade` **Event Webhook****

*   Now that the user is successfully using your tool, they've decided to upgrade their license, unlocking additional features and higher limits.
*   See [Upgrade events](/webhook/webhook__connect.html#upgrade-events)
    *   If implementing deal add-ons, also see [Migrate events](/webhook/webhook__connect.html#migrate-events-deal-add-ons-specific) for detailed information

**6\. `Downgrade` **Event Webhook****

*   Similar to the above upgrade event, the user has decided to downgrade their license, reducing available features and limits.
*   See [Downgrade events](/webhook/webhook__connect.html#downgrade-events)
    *   If implementing deal add-ons, also see [Migrate events](/webhook/webhook__connect.html#migrate-events-deal-add-ons-specific) for detailed information

**7\. `Deactivate` **Event Webhook (a.k.a. Refund)****

*   Now that the user has requested a refund, their license should be revoked, removing access to all features and limits associated with your tool.
*   See [Deactivate events](/webhook/webhook__connect.html#deactivate-events)

## [#](#how-to-collect-a-user-s-email-address-and-link-it-to-their-license-key) How to Collect a User's Email Address and Link It to Their License Key

**What's Happening**:

If you're uncertain about a users **email address** because you are not seeing it in the webhook request paramters, here’s a step-by-step breakdown:

AppSumo **does not** provide the user's email address directly through Webhooks. Instead, you’ll collect it when the user is redirected to your OAuth `redirect_uri` during the activation process. Here's the step-by-step breakdown:

**1\. `Purchase` **Event Webhook****

*   This webhook is triggered when a user purchases your product.

**2\. `Activate` **Event Webhook****

*   A second webhook is sent when the user attempts to activate their license.

**3\. **OAuth Flow****

*   After activation, the OAuth process begins. Once completed, the user is redirected to your OAuth [`redirect_uri`](/licensing/licensing__getting_started.html#best-practice-example) to complete required information and finalize the sign-up process, including **providing their email** and new account password.

**4\. **Linking the License****

*   At this stage, you’ll have an active `license_key` that you can associate with the **user’s email address** in your system.

[Webhook](/webhook/webhook__getting_started.html) information is detailed in our documentation, but **you must collect and store** the necessary details to create the user's account at your specified `redirect_uri`.

## [#](#webhook-events-managed-exclusively-by-appsumo) Webhook Events Managed Exclusively by AppSumo

**1\. What are the guidelines regarding webhook events with AppSumo?**

All webhook events must be be triggered exclusively by AppSumo. Partners are required to **avoid manually** activating, upgrading, downgrading, or deactivating/refunding a license. This protocol ensures seamless integration and communication between your system and AppSumo’s platform.

**2\. Why should partners avoid manual creation or modification of webhook events?**

AppSumo triggers and manages all webhook events to maintain system integrity and ensure proper tracking of transactions. Manual interventions can disrupt the synchronization and potentially cause errors in customer data management.

**3\. What should I do if I receive a request for manual webhook event generation or modification?**

If you encounter any requests regarding manual activation, upgrade, downgrade, or deactivate/refund of a license, please contact our support team.

*   **Select Partners**: You can reach the Support team directly in your designated **\_customer-support Slack channel** for prompt assistance.
*   **Self-listed Partners**: Email them directly at [support@appsumo.com](mailto:support@appsumo.com).

**4\. What are the potential consequences of not adhering to the webhook event management guidelines?**

Non-compliance with these guidelines can lead to discrepancies in data synchronization, causing potential service disruptions and impacting customer experience. It is critical to follow the established protocols to maintain the integrity of our partnership.

**5\. How can I contact support if I need further clarification or assistance?**

For any questions or further assistance, please reach out through the following channels:

*   **Select Partners**: You can reach the Support team directly in your designated **\_customer-support Slack channel** for prompt assistance.
*   **Self-listed Partners**: Email them directly at [support@appsumo.com](mailto:support@appsumo.com).

Our support team is ready to help you address any concerns.

← [OAuth FAQ](/faq/faq__oauth.html) [Other FAQ](/faq/faq__other.html) →
