# Next steps | AppSumo Licensing API (v2)

# [#](#next-steps) Next steps

## [#](#what-to-do-after-you-have-a-user-s-license-key) What to Do After You Have a User's License Key

Once you have a user's license key, you can verify its `status` and allow the user to access your product. Refer to the "License Key Verification" section below for details.

**Important:** The license key will serve as the primary identifier for both you and AppSumo.

## [#](#license-key-verification-required) License Key Verification (Required)

### [#](#new-users-who-don-t-already-have-an-account-with-your-product) New users who don’t already have an account with your product

You have flexibility in handling new users, but we suggest displaying a **"Create an Account"** page if the **license key is not found in your database**. This approach lets you collect the information needed to set up their account including email and password.

After the user completes and submits your account creation form, link the license key to their new account and provide access to your product with the appropriate license `tier`.

### [#](#existing-users-with-an-account-already-set-up) Existing users with an account already set up

For existing users, check the license key when they visit your page. If the license is valid, log them in and provide access to your product.

## [#](#checking-a-license-status) Checking a License Status

After fetching a license (see [Licensing: Fetching a license](/licensing/licensing__connect.html#fetching-a-license)), you will receive a `JSON` response indicating the current `status` of the license, which can be one of the following:

*   `active`: The license is valid and previously activated. The user's account should already be set up and linked to this license, granting them access.
    
*   `deactivated`: The license is no longer valid, so access to your product should be restricted or disabled.
    
*   `inactive`: The license is valid but not yet activated. You need to create an account for the user and activate the license to provide access.
    

**Example response JSON**:

```
{
  "license_key": "d8bfa201-d8c0-4bc8-a27c-b1c12efa4a5a",
  "status": "active",
  "scopes": ["read_license"]
}
```

← [Connect to AppSumo](/licensing/licensing__connect.html) [Overview](/webhook/webhook__overview.html) →
