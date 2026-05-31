# OAuth FAQ | AppSumo Licensing API (v2)

# [#](#oauth-faq) OAuth FAQ

## [#](#_403-forbidden-error) 403 Forbidden Error

**What's Happening**:

You're seeing a **403 Forbidden error** when trying to activate your license.

![403 Forbidden OAuth Error](/assets/img/403_forbidden.462945d1.png)

**Troubleshooting Tips**:

1.  **Check Your Redirect URL’s:**
    *   Make sure the `redirect_uri` you include in your request is **exactly the same** as the OAuth Redirect URL you set up in your [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/). Both URLs must match perfectly for OAuth to be successful.
2.  **OAuth Code Usage**
    *   **One-Time Use:** The OAuth `code` can only be used **once** and will expire after it's been used, either successful or through error.
    *   **New Code Issuance:** A **new** `code` will be generated each time you authorize through OAuth.
    *   **Re-attempt Activation:** To get a **new** `code`, simply re-attempt the license activation process.
3.  **Re-validate Your OAuth Keys**
    *   **Double-Check Your Keys:** Ensure that your `client_id` and `client_secret` keys are correct. You can find both keys in your [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/).

For detailed information, see [OAuth Getting Started](/licensing/licensing__getting_started.html) and [OAuth Connect to AppSumo](/licensing/licensing__connect.html)

← [Partner profile API](/api/api__profile.html) [Webhooks FAQ](/faq/faq__webhooks.html) →
