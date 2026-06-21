# Overview | AppSumo Licensing API (v2)

# [#](#overview) Overview

This guide walks you through setting up your product on AppSumo, including configuring both **Webhook** and **OAuth Redirect URLs**, validating them, and obtaining your OAuth keys. For detailed information, refer to [User login (OAuth)](/licensing/licensing__overview.html) and [Webhooks](/webhook/webhook__overview.html).

## [#](#prerequisites) Prerequisites

*   **OAuth Redirect URL:** Must handle `GET` requests.
*   **Webhook URL:** Must handle `POST` requests.
*   **OAuth Keys:** `client_id` and `client_secret`
    *   This will be accessible once the specified URLs are validated and your listing or settings have been submitted.

## [#](#configuration-and-url-validation) Configuration and URL Validation

**Access Settings:** Go to the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/) and select your product.

*   For **AppSumo Select Partners**, click the **"API settings"** link. For **Self-listed partners**, click anywhere in the row (as shown below).

![Select Partners](/assets/img/listings_partner_portal.dce918f4.png)

### [#](#validate-both-webhook-and-oauth-urls) Validate both Webhook and OAuth URLs:

1.  **OAuth Redirect URL:** Pre-validate by receiving a `GET` **request without any included payload.**
    *   This URL must return a `200 OK` status code.

After a user authorizes your application on AppSumo via OAuth, they are redirected back to your app with an `authorization code` in the URL.

**Important:** Ensure that the validated OAuth Redirect URL in AppSumo aligns with the URL on your backend where you want to direct new customers to complete required information and finalize the sign-up process, including providing their email and new account password.

See [User login (OAuth)](/licensing/licensing__overview.html) for more information.

![Oauth Redirect Config](/assets/img/oauth_redirect_config.fe888aac.png)

2.  **Webhook URL:** Pre-validate by receiving a `POST` request with a field called `test` in the body.
    *   This URL must return a `200 OK` with a JSON response indicating `success` = `true` and the event type it received.
    *   For the initial test, **you must respond to/with the following** event types:
        1.  `activate`
        2.  `deactivate`
        3.  `purchase` (optional)

![Webhook URL](/assets/img/Webhook_url.74266dc8.png)

#### [#](#example-of-a-successful-response-to-the-webhook-in-json-format) Example of a successful response to the webhook (in JSON format):

```
{
  "event": "activate",
  "success": true
}
```

Refer to the [Webhooks](/webhook/webhook__overview.html) section for an overview, and see the guidance on [Sending a successful response](/webhook/webhook__connect.html#sending-a-successful-response) to learn how to process your webhooks effectively.

## [#](#post-validation) Post-Validation

### [#](#oauth-keys) OAuth keys

After validating both your Webhook and OAuth Redirect URLs, your OAuth keys (`client_id` and `client_secret`) will be generated. You can locate these keys on your product page in the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/). The keys are hidden by default; click the eye icon to view them (as shown below):

![Private keys](/assets/img/private_keys.d80967b3.png)

### [#](#live-webhooks-and-license-history) Live Webhooks and License history

Now that your URLs are validated and OAuth keys are secured, you can start interacting with the buy button within your [Product Detail Page on AppSumo (opens new window)](https://appsumo.com/products/tidycal/#pricePlans) (_TidyCal used here as an example_) using the **developer credits** assigned to you by our **Launch Operations** team.

**Live payloads** will now be sent (as demonstrated later in this guide) for you to access and store real-time data.

You can access your License History UI in the API settings section of the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/).

![License History Navigation](/assets/img/License_History_Navigation.36d7f1ce.png)

![License History](/assets/img/License_History.9e7680c1.png)

## [#](#next-steps) Next steps

*   For more in depth information on validating URLs and what to do after submitting your application:
    *   OAuth, see [User login (OAuth)](/licensing/licensing__overview.html)
    *   Webhooks, see [Webhooks](/webhook/webhook__overview.html)

← [Home](/) [Set up licensing with AI](/quick-start/quick-start__skill.html) →
