# Getting started | AppSumo Licensing API (v2)

# [#](#getting-started) Getting started

## [#](#prerequisites) Prerequisites

*   **Approved Application:** Ensure your application is approved on AppSumo.
*   **Redirect URL:** Have a Redirect URL that can handle requests from AppSumo.
*   **Allow Requests:** Ensure your server accepts requests from `appsumo.com`.

## [#](#adding-and-testing-a-webhook-url) Adding and Testing a Webhook URL

To add your webhook URL, visit the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/) and select your product. AppSumo will send a test request to verify the URL, which must respond successfully to be saved.

Before saving, the URL will receive a test `POST` request containing a "**test**" field in the body. This request is for verification only, and the accompanying data is not valid.

Your URL must respond with a `200 OK` status and a `JSON` response indicating `success = true` along with the received event type.

Ensure all test requests return a successful response to confirm that your webhook is functioning correctly.

![Webhook URL](/assets/img/Webhook_url.74266dc8.png)

**Example**:

```
{
  "license_key": "00000000-aaaa-1111-bbbb-abcdef012345",
  "event": "purchase",
  "license_status": "inactive",
  "event_timestamp": 1318781876406,
  "created_at": 1318738512,
  "test": true
}
```

← [Overview](/webhook/webhook__overview.html) [Connect to AppSumo](/webhook/webhook__connect.html) →
