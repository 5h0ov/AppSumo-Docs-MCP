# Getting started | AppSumo Licensing API (v2)

# [#](#getting-started) Getting started

## [#](#prerequisites) Prerequisites

1.  **Approved AppSumo Application:** Your product must be approved on AppSumo.
2.  **OAuth Redirect URL:** A URL capable of processing OAuth requests.
3.  **OAuth Keys:** `client_id` and `client_secret` keys, which are available once your URLs are validated.

## [#](#oauth-redirect-url) OAuth Redirect URL

Redirect URLs are essential for the OAuth flow, guiding users back to your app with an `authorization code` after access is granted. Ensure this URL securely handles requests and is validated with a `200 OK` response from the AppSumo Partner Portal.

Because the OAuth Redirect URL will contain sensitive information, it is critical that the service doesn’t redirect the user to arbitrary locations.

To add a Redirect URL, visit the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/) and select your product. In order to save the URL, AppSumo must get a successful `200 OK` response.

![Oauth Redirect Config](/assets/img/oauth_redirect_config.fe888aac.png)

**Important:** Ensure that the validated OAuth Redirect URL in AppSumo aligns with the URL on your backend where you want to direct new customers to complete required information and finalize the sign-up process, including providing their email and new account password.

### [#](#best-practice-example) Best practice example:

Upon completing a `purchase` on AppSumo, users will `activate` their license and be **redirected to the sign-up page you provided in your OAuth configuration**. On this page, they will input their email, password, and any required details to create an account, ensuring they receive the correct license `tier` and associated feature limits.

![](/assets/img/best-practice-redirect-url.d1325580.jpg)

## [#](#testing) Testing

When saving your OAuth Redirect URL in the AppSumo Partner Portal:

1.  AppSumo will send a `GET` request **without any included payload** to validate it.
2.  The URL must respond with a `200 OK` status code to be deemed valid.
3.  **Once validated**, **live payloads will be sent** to your URL as detailed in this guide. Live payloads are only sent when interacting with your AppSumo Product Detail Page.

You can test and adjust these URL settings in the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/) when setting up your listing or anytime after submission, even if initial URL validation was not completed.

## [#](#oauth-keys) OAuth keys

After validating both your Webhook and OAuth Redirect URLs, your OAuth keys (`client_id` and `client_secret`) will be generated.

You can locate these keys on your product page in the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/). The keys are hidden by default; click the eye icon to view them (as shown below).

![Private keys](/assets/img/private_keys.d80967b3.png)

← [Overview](/licensing/licensing__overview.html) [Connect to AppSumo](/licensing/licensing__connect.html) →
