# AppSumo Licensing Guide | AppSumo Licensing API (v2)

# [#](#appsumo-licensing-guide) AppSumo Licensing Guide

## [#](#introduction) Introduction

AppSumo licensing helps customers seamlessly activate their accounts with your product immediately after purchasing on AppSumo.

**All license keys are exclusivey generated and managed by AppSumo** through webhooks triggered by events such as

```
Purchase, Activate, Upgrade, Downgrade, Deactivate,
```

and `Migrate` (specific to deal add-ons).

**Important**:  
To ensure the success of our mutual customers, our partners (you), and AppSumo, it is **mission critical** that when implementing AppSumo licensing, you store all `license_key` data and have it easily accessible for your customer support team.

*   Save all `license_key` data from AppSumo webhooks.
*   Create a dashboard where your support team can look up customers by `license_key` (not an email address).
*   AppSumo doesn't store customer emails - only `license_keys` for lookups.

## [#](#overview) Overview

When a user purchases your product on AppSumo, they are prompted to activate their license through two key steps:

1.  **License Activation Webhook:** AppSumo sends a [webhook notification](/webhook/webhook__connect.html#processing-the-webhook-request) to your system to indicate license activation. Your app should save and mark the license key as active in your database.
    
2.  **OAuth Authentication:** Users are prompted to connect through [OAuth](/licensing/licensing__connect.html#connecting-to-appsumo-oauth), directing them to authenticate on your platform.
    

![OAuth Flow](/assets/img/oauth_flow_client.44be8db6.png)

### [#](#oauth-flow) OAuth Flow

*   **Authorization:** Users accept OAuth scopes and are redirected to your site via the [redirect url](/licensing/licensing__getting_started.html#oauth-redirect-url) configured in the AppSumo Partner Portal.
    
*   **Access Token Retrieval:** Your app retrieves an access token to fetch the user's license key.
    
*   **User Scenarios:**
    
    *   **New User:** If the license key isn't linked to a user, prompt the customer to sign up or log in. Guide new users through registration and apply the license key.
    *   **Existing User:** If already associated, log the user in automatically.
*   **License Deactivation:** If a license needs deactivation, a webhook message will notify your system. Mark the license as invalid but ensure reactivation handling is supported.
    

### [#](#key-considerations) Key Considerations

*   **Reactivation Handling:** Be prepared to manage potential reactivations to ensure a smooth user experience.
*   **Further Learning:** For more details on additional webhooks and APIs, explore the full documentation.

Following these steps helps effectively integrate AppSumo Licensing, streamlining user experience and license management.

[Overview](/quick-start/quick-start__overview.html) →
