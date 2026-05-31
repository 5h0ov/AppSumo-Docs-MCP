# Connect to AppSumo | AppSumo Licensing API (v2)

# [#](#connect-to-appsumo) Connect to AppSumo

## [#](#receiving-webhook-requests) Receiving webhook requests

Receiving webhook requests from AppSumo requires 4 steps.

1.  Saving your webhook URL _(See [Webhooks: Getting started](/webhook/webhook__getting_started.html))_
2.  Validating the request
3.  Processing the webhook request
4.  Return a "success" response

There is also a [test webhook](#test-webhook-events) request that verifies the webhook saved in the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/).

## [#](#validating-the-request) Validating the request

Anytime a user makes a purchase (or activates/deactivates a license) a webhook is sent to the webhook URL provided. To ensure that the request is valid (and not someone trying to malicious), you will need to authenticate the request _(See [Webhook security](/webhook/webhook__security.html))_.

## [#](#processing-the-webhook-request) Processing the webhook request

After validating the request, you will need to process the data that is sent to you. The request sent will allow onboarding of new users or deactivating existing ones. What you decide to do with this information is up to you. However, we suggest that you update the status of the license in your system as well, for auditing purposes. For example, if you receive a `deactivate` event, set the license status for your user's account to `deactivated`.

**Important note regarding add-ons**: In the webhook examples below, you’ll see both a standard (non-add-on) example and an add-on-specific example. Add-on webhooks are sent for the following events:

```
purchase, activate, upgrade, downgrade, and deactivate
```

.

Additionally, the **`migrate` event** is sent for both `upgrade` and `downgrade` events specifically related to deal add-ons. (See [Migrate Events](#migrate-events-deal-add-ons-specific) for detailed information.)

You can identify an add-on webhook by the presence of the `parent_license_key`. This field links the add-on’s `license_key` to the `license_key` of its parent deal and is the key indicator that the webhook is for an add-on.

Looking for a list of webhook definitions? Check out [Webhook Object](#webhook-object) located at the bottom of this page.

### [#](#purchase-events) Purchase events

After a license is purchased, the `purchase` data will be sent to your webhook. You can use the `license_key` to set up a placeholder account for the user (so it will be ready when they `activate` and access your product.)

The following 4 examples demonstrate `purchase` events for deals without add-ons, deals with associated add-ons, and standalone add-on purchases.

1.  `Purchase` event of a parent deal with no associated deal add-ons.
2.  `Purchase` event with 2 associated deal add-ons.
3.  **Post** `purchase` event of a standalone add-on where the parent deal has yet to be activated.
4.  **Post** `purchase` event of a standalone add-on where the parent deal has been previously activated. This scenario triggers both a `purchase` event and an `activate` event for the add-on. The activation occurs automatically since the parent deal was previously activated.

**Example #1: `purchase` event of a deal with no associated deal add-ons**:

```json
{
  "license_key": "3794577c-3dbc-11ec-9bbc-0242ac130002",
  "event": "purchase",
  "license_status": "inactive",
  "event_timestamp": 1318781876406,
  "created_at": 1318738512,
  "test": false
}
```

**Example #2: `purchase` event with 2 associated deal add-ons**:

*   To identify an add-on-specific webhook request, look for the `parent_license_key` object, which serves as the key identifier.

```json
{
  "license_key": "9869ba65-cf39-405e-98db-6e2ca29f94fa",
  "event": "purchase",
  "event_timestamp": 1754671919169,
  "created_at": 1754671919158,
  "license_status": "inactive",
  "tier": 2,
  "extra": { "reason": "Purchased" },
  "partner_plan_name": "License Tier 2",
  "unit_quantity": 1
}
{
  "license_key": "9204570c-7832-47e2-8708-efb67d702995",
  "event": "purchase",
  "event_timestamp": 1754671919197,
  "created_at": 1754671919194,
  "license_status": "inactive",
  "tier": 1,
  "extra": { "reason": "Purchased" },
  "partner_plan_name": "addon_partner_name_here_add_seats",
  "unit_quantity": 10,
  "parent_license_key": "9869ba65-cf39-405e-98db-6e2ca29f94fa"
}
{
  "license_key": "1a5eb69f-4fb3-4734-ba69-e6e9fdd7da1b",
  "event": "purchase",
  "event_timestamp": 1754671919221,
  "created_at": 1754671919219,
  "license_status": "inactive",
  "tier": 1,
  "extra": { "reason": "Purchased" },
  "partner_plan_name": "addon_partner_name_here_white_labeling",
  "unit_quantity": 1,
  "parent_license_key": "9869ba65-cf39-405e-98db-6e2ca29f94fa"
}
```

**Example #3: Post `purchase` event of a standalone add-on where the parent deal has yet to be activated**:

*   To identify an add-on-specific webhook request, look for the `parent_license_key` object, which serves as the key identifier.

```json
{
  "license_key": "cbc72957-f6cf-4d0c-ab5b-48f48930f8b5",
  "event": "purchase",
  "event_timestamp": 1754671919221,
  "created_at": 1754671919219,
  "license_status": "inactive",
  "tier": 1,
  "extra": { "reason": "Purchased" },
  "partner_plan_name": "addon_partner_name_here_white_labeling",
  "unit_quantity": 1,
  "parent_license_key": "826315d7-1bfc-43d9-a3b4-ef80c47352b6"
}
```

**Example #4: Post `purchase` event of a standalone add-on where the parent deal has been previously activated**:

*   To identify an add-on-specific webhook request, look for the `parent_license_key` object, which serves as the key identifier.

```json
{
  "license_key": "b0c3ceec-d4dd-4ca6-a074-744e08733729",
  "event": "purchase",
  "event_timestamp": 1754671919221,
  "created_at": 1754671919219,
  "license_status": "inactive",
  "tier": 1,
  "extra": { "reason": "Purchased" },
  "partner_plan_name": "addon_partner_name_here_white_labeling",
  "unit_quantity": 1,
  "parent_license_key": "826315d7-1bfc-43d9-a3b4-ef80c47352b6"
}
{
  "license_key": "b0c3ceec-d4dd-4ca6-a074-744e08733729",
  "event": "activate",
  "event_timestamp": 1754671919221,
  "created_at": 1754671919219,
  "license_status": "inactive",
  "tier": 1,
  "extra": { "reason": "Post-purchase add-on for active parent deal" },
  "partner_plan_name": "addon_partner_name_here_white_labeling",
  "unit_quantity": 1,
  "parent_license_key": "826315d7-1bfc-43d9-a3b4-ef80c47352b6"
}
```

### [#](#activate-events) Activate events

After a license is activated, the `activate` data will be sent to your webhook.

**Example (no deal add-ons)**:

```json
{
  "license_key": "3794577c-3dbc-11ec-9bbc-0242ac130002",
  "event": "activate",
  "license_status": "inactive",
  "event_timestamp": 1318781876406,
  "created_at": 1318738512,
  "tier": 1,
  "test": false,
  "extra": {
    "reason": "Purchased by the customer"
  }
}
```

Notice that the `event` is `activate` but the license status is `inactive`. The reason for this is because AppSumo needs a successful (`200`) response from your application to `activate` it on AppSumo. Once activated, the user will be able to access it via AppSumo.

**Example: `activate` event with 2 associated deal add-ons**:

*   To identify an add-on-specific webhook request, look for the `parent_license_key` object, which serves as the key identifier.

```json
{
  "license_key": "9869ba65-cf39-405e-98db-6e2ca29f94fa",
  "event": "activate",
  "event_timestamp": 1754671943761,
  "created_at": 1754671943750,
  "license_status": "inactive",
  "tier": 2,
  "extra": { "reason": "Activated by user" },
  "partner_plan_name": "License Tier 2",
  "unit_quantity": 1
}
{
  "license_key": "9204570c-7832-47e2-8708-efb67d702995",
  "event": "activate",
  "event_timestamp": 1754671943783,
  "created_at": 1754671943781,
  "license_status": "inactive",
  "tier": 1,
  "extra": { "reason": "Parent deal activated" },
  "partner_plan_name": "addon_partner_name_here_add_seats",
  "unit_quantity": 10,
  "parent_license_key": "9869ba65-cf39-405e-98db-6e2ca29f94fa"
}
{
  "license_key": "c01f7931-9c74-4a45-bca8-3f82e32579e5",
  "event": "activate",
  "event_timestamp": 1754671943783,
  "created_at": 1754671943781,
  "license_status": "inactive",
  "tier": 1,
  "extra": { "reason": "Parent deal activated" },
  "partner_plan_name": "addon_partner_name_here_white_labeling",
  "unit_quantity": 10,
  "parent_license_key": "9869ba65-cf39-405e-98db-6e2ca29f94fa"
}
```

**Note: It is the responsibility of the AppSumo Partner to activate the user in their application as well.**

### [#](#upgrade-events) Upgrade events

An `upgrade` event is sent when customer enhances the license tier of a product.

**Example: `upgrade` from tier 1 to tier 2 (no deal add-ons)**:

```json
{
  "license_key": "c86ad3d7-3942-4d11-8814-b0bd81971691",
  "prev_license_key": "3794577c-3dbc-11ec-9bbc-0242ac130002",
  "event": "upgrade",
  "event_timestamp": 1671586387628,
  "created_at": 1671586387624,
  "license_status": "inactive",
  "tier": 2,
  "test": false,
  "extra": {
    "reason": "Upgraded by the customer"
  }
}
```

Each time a license is upgraded, it generates a new and unique `license_key` UUID. This key will be the customer's current **activated** license key for your product. The license status will be `inactive` and you need to `activate` it on your side. Once you reply with a [successful](#sending-a-successful-response) response AppSumo is going to `activate` it in our side.

The purpose of the new UUID is to provide a better license history and traceability. The `prev_license_key` and `tier` properties will allow you to apply the new tier to a customer. A very brief example would be to:

*   Find the customer by their `license_key`
*   Either:
    *   Remove old license key entry and create a new one
    *   Replace the license key with the new license key and update the tier.

In addition to the `upgrade` event, you will receive a simultaneous `deactivate` event for the previous license for traceability purposes:

```json
{
  "license_key": "3794577c-3dbc-11ec-9bbc-0242ac130002",
  "event": "deactivate",
  "event_timestamp": 1671586388077,
  "created_at": 1671586388072,
  "license_status": "deactivated",
  "tier": 1,
  "test": false,
  "extra": {
    "reason": "Upgraded by the customer"
  }
}
```

**Note:** The `license_status` in the payload is **deactivated**. AppSumo deactivates the license after sending the `upgrade` event and receives a successful response from the Partner.

**Example: `upgrade` event with 2 associated deal add-ons**:

*   To identify an add-on-specific webhook request, look for the `parent_license_key` object, which serves as the key identifier.
*   For add-ons, the `migrate` event serves as a notification to the partner. It indicates that data should be transferred to the newly issued `license_key`.
    *   Check out [Migrate events](#migrate-events-deal-add-ons-specific) for detailed information.

```json
{
  "license_key": "5be40bfd-1f04-44e9-ab4f-cc0e8848415c",
  "prev_license_key": "10281aa4-d79e-469a-ade2-0a0601b76ebb",
  "event": "upgrade",
  "event_timestamp": 1754671653171,
  "created_at": 1754671653169,
  "license_status": "inactive",
  "tier": 2,
  "extra": { "reason": "Upgraded by customer" },
  "partner_plan_name": "License Tier 2",
  "unit_quantity": 1
}
{
  "license_key": "10281aa4-d79e-469a-ade2-0a0601b76ebb",
  "event": "deactivate",
  "event_timestamp": 1754671653184,
  "created_at": 1754671653182,
  "license_status": "deactivated",
  "tier": 1,
  "extra": { "reason": "Upgraded by customer" },
  "partner_plan_name": "License Tier 1",
  "unit_quantity": 1
}
{
  "license_key": "6e3d9ed5-96f8-47e9-9e37-cce4fcbd2fea",
  "event": "migrate",
  "event_timestamp": 1754671653193,
  "created_at": 1754671653192,
  "license_status": "active",
  "tier": 1,
  "extra": { "reason": "Parent deal upgrade" },
  "partner_plan_name": "addon_partner_name_here_add_seats",
  "unit_quantity": 5,
  "parent_license_key": "5be40bfd-1f04-44e9-ab4f-cc0e8848415c"
}
{
  "license_key": "c01f7931-9c74-4a45-bca8-3f82e32579e5",
  "event": "migrate",
  "event_timestamp": 1754671653200,
  "created_at": 1754671653198,
  "license_status": "active",
  "tier": 1,
  "extra": { "reason": "Parent deal upgrade" },
  "partner_plan_name": "addon_partner_name_here_white_labeling",
  "unit_quantity": 1,
  "parent_license_key": "5be40bfd-1f04-44e9-ab4f-cc0e8848415c"
}
```

### [#](#downgrade-events) Downgrade events

A `downgrade` event is sent when customer reduces the license tier. An example would be downgrading tier 2 to tier 1.

**Example (no deal add-ons)**:

```json
{
  "license_key": "c8e57fa3-ea5b-4c39-a2bf-74f7f51d01b0",
  "prev_license_key": "c86ad3d7-3942-4d11-8814-b0bd81971691",
  "event": "downgrade",
  "event_timestamp": 1671586699435,
  "created_at": 1671586699431,
  "license_status": "inactive",
  "tier": 1,
  "test": false,
  "extra": {
    "reason": "Downgraded by the customer"
  }
}
```

Similarly to **upgrade** events, each license's **downgrade** event generates a new and unique inactive `license_key` UUID. Even if a product is **upgraded** to tier 2, then **downgraded** to tier 1 and finally **upgraded** back again to tier 2, AppSumo will send the new `license_key` for each upgrade and downgrade.

In addition to the `downgrade` event, you will receive a simultaneous `deactivate` event for the previous license for traceability purpose:

```json
{
  "license_key": "c86ad3d7-3942-4d11-8814-b0bd81971691",
  "event": "deactivate",
  "event_timestamp": 1671586699927,
  "created_at": 1671586699922,
  "license_status": "deactivated",
  "tier": 2,
  "test": false,
  "extra": {
    "reason": "Downgraded by the customer"
  }
}
```

**Example: `downgrade` event with 2 associated deal add-ons**:

*   To identify an add-on-specific webhook request, look for the `parent_license_key` object, which serves as the key identifier.
*   For add-ons, the `migrate` event serves as a notification to the partner. It indicates that data should be transferred to the newly issued `license_key`.
    *   Check out [Migrate events](#migrate-events-deal-add-ons-specific) for detailed information.

```json
{
  "license_key": "10281aa4-d79e-469a-ade2-0a0601b76ebb",
  "prev_license_key": "8f8e107a-5438-4f47-9ec0-d1bce6c88dbd",
  "event": "downgrade",
  "event_timestamp": 1754671031718,
  "created_at": 1754671031716,
  "license_status": "inactive",
  "tier": 1,
  "extra": { "reason": "Downgraded by customer" },
  "partner_plan_name": "License Tier 1",
  "unit_quantity": 1
}

{
  "license_key": "8f8e107a-5438-4f47-9ec0-d1bce6c88dbd",
  "event": "deactivate",
  "event_timestamp": 1754671031736,
  "created_at": 1754671031734,
  "license_status": "deactivated",
  "tier": 2,
  "extra": { "reason": "Downgraded by customer" },
  "partner_plan_name": "License Tier 2",
  "unit_quantity": 1
}

{
  "license_key": "6e3d9ed5-96f8-47e9-9e37-cce4fcbd2fea",
  "event": "migrate",
  "event_timestamp": 1754671031747,
  "created_at": 1754671031744,
  "license_status": "active",
  "tier": 1,
  "extra": { "reason": "Parent deal downgrade" },
  "partner_plan_name": "addon_partner_name_here_add_seats",
  "unit_quantity": 5,
  "parent_license_key": "10281aa4-d79e-469a-ade2-0a0601b76ebb"
}

{
  "license_key": "c01f7931-9c74-4a45-bca8-3f82e32579e5",
  "event": "migrate",
  "event_timestamp": 1754671031753,
  "created_at": 1754671031751,
  "license_status": "active",
  "tier": 1,
  "extra": { "reason": "Parent deal downgrade" },
  "partner_plan_name": "addon_partner_name_here_white_labeling",
  "unit_quantity": 1,
  "parent_license_key": "10281aa4-d79e-469a-ade2-0a0601b76ebb"
}
```

### [#](#deactivate-events) Deactivate events

After a license is deactivated, the `deactivate` data will be sent to your webhook. A separate, unrelated `deactivate` event will be triggered by a user requesting a refund or intervention by AppSumo staff.

**Example**:

```json
{
  "license_key": "c8e57fa3-ea5b-4c39-a2bf-74f7f51d01b0",
  "event": "deactivate",
  "license_status": "active",
  "event_timestamp": 1671586699927,
  "created_at": 1671586699922,
  "test": false,
  "extra": {
    "reason": "Refunded by the user"
  }
}
```

Notice that the `event` is `deactivate` but the status is `active`. The reason for this is because AppSumo needs a successful (`200`) response from your application to `deactivate` it on AppSumo. Once deactivated, the user will no longer be able to access it via AppSumo.

**Note: It is the responsibility of the AppSumo Partner to deactivate the user in their application as well.**

**Example: `deactivate` event with 2 associated deal add-ons**:

*   To identify an add-on-specific webhook request, look for the `parent_license_key` object, which serves as the key identifier.
*   Upon a customer initiating a refund, the `deactivate` event is triggered for the parent license. This action automatically deactivates both the parent license and all associated add-ons.

```json
{
  "license_key": "9869ba65-cf39-405e-98db-6e2ca29f94fa",
  "event": "deactivate",
  "event_timestamp": 1754671973183,
  "created_at": 1754671973166,
  "license_status": "active",
  "tier": 2,
  "extra": { "reason": "Refunded by customer" },
  "partner_plan_name": "License Tier 2",
  "unit_quantity": 1
}

{
  "license_key": "9204570c-7832-47e2-8708-efb67d702995",
  "event": "deactivate",
  "event_timestamp": 1754671975099,
  "created_at": 1754671975096,
  "license_status": "active",
  "tier": 1,
  "extra": { "reason": "Refunded by customer" },
  "partner_plan_name": "addon_partner_name_here_add_seats",
  "unit_quantity": 10,
  "parent_license_key": "9869ba65-cf39-405e-98db-6e2ca29f94fa"
}

{
  "license_key": "1a5eb69f-4fb3-4734-ba69-e6e9fdd7da1b",
  "event": "deactivate",
  "event_timestamp": 1754671976902,
  "created_at": 1754671976879,
  "license_status": "active",
  "tier": 1,
  "extra": { "reason": "Refunded by customer" },
  "partner_plan_name": "addon_partner_name_here_white_labeling",
  "unit_quantity": 1,
  "parent_license_key": "9869ba65-cf39-405e-98db-6e2ca29f94fa"
}
```

### [#](#migrate-events-deal-add-ons-specific) Migrate events (deal add-ons specific)

A `migrate` event is sent during both `upgrade` and `downgrade` events specifically related to **deal add-ons**. This event serves as a ledger record, assuming the association with the newly upgraded or downgraded parent deal has already been established through the `upgrade/downgrade` webhook.

**Example**:

```json
{
  "license_key": "9ac1dd89-d8ac-4a26-9bfd-856e9b79c3f4",
  "event": "migrate",
  "event_timestamp": 1754434889229,
  "created_at": 1754434889226,
  "license_status": "inactive",
  "tier": 1,
  "extra": { "reason": "Parent deal upgrade" },
  "partner_plan_name": "addon_partner_name_here_add_seats",
  "unit_quantity": 15,
  "parent_license_key": "cba05276-0c32-493b-856e-7836b71df387"
}
```

**Example: parent license `upgrade` webhook with associated `migrate` event webhooks for deal add-ons**:  

Notes:

*   This establishes the link between the new parent deal's license key and the existing add-on.
*   Notice how the `parent_license_key` in the above example matches the new `license_key` of the upgraded parent.

```json
{
  "license_key": "5be40bfd-1f04-44e9-ab4f-cc0e8848415c",
  "prev_license_key": "10281aa4-d79e-469a-ade2-0a0601b76ebb",
  "event": "upgrade",
  "event_timestamp": 1754671653171,
  "created_at": 1754671653169,
  "license_status": "inactive",
  "tier": 2,
  "extra": { "reason": "Upgraded by customer" },
  "partner_plan_name": "License Tier 2",
  "unit_quantity": 1
}
{
  "license_key": "10281aa4-d79e-469a-ade2-0a0601b76ebb",
  "event": "deactivate",
  "event_timestamp": 1754671653184,
  "created_at": 1754671653182,
  "license_status": "deactivated",
  "tier": 1,
  "extra": { "reason": "Upgraded by customer" },
  "partner_plan_name": "License Tier 1",
  "unit_quantity": 1
}
{
  "license_key": "6e3d9ed5-96f8-47e9-9e37-cce4fcbd2fea",
  "event": "migrate",
  "event_timestamp": 1754671653193,
  "created_at": 1754671653192,
  "license_status": "deactivated",
  "tier": 1,
  "extra": { "reason": "Parent deal upgrade" },
  "partner_plan_name": "addon_partner_name_here_add_seats",
  "unit_quantity": 5,
  "parent_license_key": "5be40bfd-1f04-44e9-ab4f-cc0e8848415c"
}
{
  "license_key": "c01f7931-9c74-4a45-bca8-3f82e32579e5",
  "event": "migrate",
  "event_timestamp": 1754671653200,
  "created_at": 1754671653198,
  "license_status": "active",
  "tier": 1,
  "extra": { "reason": "Parent deal upgrade" },
  "partner_plan_name": "addon_partner_name_here_white_labeling",
  "unit_quantity": 1,
  "parent_license_key": "5be40bfd-1f04-44e9-ab4f-cc0e8848415c"
}
```

### [#](#test-webhook-events) Test webhook events

Test events are initiated when trying to save a webhook via the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/). Notice that the `test` is `true`. This means that the data can be ignored, but it **must still send a successful (`200`) response**.

**Example**:

```json
{
  "license_key": "00000000-aaaa-1111-bbbb-abcdef012345",
  "event": "purchase",
  "license_status": "inactive",
  "event_timestamp": 1318781876406,
  "created_at": 1318738512,
  "tier": 1,
  "test": true,
  "extra": {
    "reason": "Test event"
  }
}
```

## [#](#sending-a-successful-response) Sending a successful response

In order to ensure that the webhook was successfully received, AppSumo needs a confirmation response. All that is needed in the response is to repeat the event back (for event types [see above](#processing-the-webhook-request)) and with `success` = `true`.

**Example**:

##### Python

```
from django.views.generic import View
from django.http import JsonResponse
from rest_framework.status import HTTP_200_OK


# Use your urls.py to use this view
class MyAppSumoWebhook(View):
  def post(self, request, *args, **kwargs):

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)

    license_key = body.get('license_key')
    event = body.get('event')
    status = body.get('status')
    created_at = body.get('created_at')
    event_timestamp = body.get('event_timestamp')
    test = body.get('test')

    # TODO -- Process license_key, status, and event for your user
    # If test is true, do not process

    return JsonResponse({
         "success": True,
         "event": event,
         "message": "Your OPTIONAL message"
    }, status=HTTP_200_OK)
```

##### Node.js

```
const express = require('express')
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/your-appsumo-webhook-url', (req, res) => {
  const {
    created_at,
    event_timestamp,
    event,
    license_key,
    license_status,
    test,
  } = req.body;

  // Return a 200 response if test is true

  // TODO -- Process license_key, status, and event for your user
  // If test is true, do not process

  res.json({
    event,
    success: true,
    message: 'Your OPTIONAL message',
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
```

##### Go

```
package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
)

type webhookRequest struct {
	LicenseKey     string `json:"license_key"`
	LicenseStatus  string `json:"license_status"`
	EventTimestamp int    `json:"event_timestamp"`
	CreatedAt      int    `json:"created_at"`
	Event          string `json:"event"`
	Test           bool   `json:"test"`
}

type myWebhookResponse struct {
	Success bool   `json:"success"`
	Event   string `json:"event"`
  Message   string `json:"message"`
}

func myAppSumoWebhook(w http.ResponseWriter, r *http.Request) {
	var request webhookRequest

	body, _ := io.ReadAll(r.Body)
	json.Unmarshal(body, &request)

	// TODO -- Process license_key, license_status for your user
  // If request.Test is true, do not process

	// Send the response
	res := myWebhookResponse{
		Success: true,
		Event:   request.Event,
    Message: "Your OPTIONAL message",
	}

	json.NewEncoder(w).Encode(res)
}

func handleRequests() {
	http.HandleFunc("/my-appsumo-webhook-url", myAppSumoWebhook)
	log.Fatal(http.ListenAndServe(":5000", nil))
}

func main() {
	handleRequests()
}
```

##### PHP

```
<?php
  class MyControllers
  {
    # Have your router use this controller
    function myWebhookController()
    {
      $json = file_get_contents('php://input');
      $data = json_decode($json, true);

      $event = $data['event'];
      $license_key = $data['license_key'];
      $license_status = $data['license_status'];
      $event_timestamp = $data['event_timestamp'];
      $created_at = $data['created_at'];
      $test = $data['test'];

      # TODO -- Process license_key, status, and event for your user
      # If $test is true, do not process

      $message = 'Your OPTIONAL message';
      $response = array('success' => true, 'event' => $event, 'message' => $message);

      header('Content-Type: application/json');
      echo json_encode($response);
      exit();
    }
  }
?>
```

## [#](#webhook-object) Webhook Object

#### [#](#attributes) Attributes:

**license\_key** `string` - UUID  
The Product's license key the webhook belongs to. This is a UUID string based on [RFC 4122 (opens new window)](https://www.rfc-editor.org/rfc/rfc4122)

**prev\_license\_key** `string`  
The previous Product's license key. This field is sent only for `upgrade` or `downgrade` webhook.

**event** `string`  
The event is the customer action for the Product's license key, it's one of `activate`, `deactivate`, `purchase`, `upgrade`, `downgrade`.

**event\_timestamp** `integer` - timestamp  
Time at which the webhook was sent. It changes when retrying to deliver the webhook.

**created\_at** `integer` - timestamp  
Time at which the license key was created. It does not change on retrying.

**license\_status** `string`  
The current status of the license on AppSumo side.

**tier** `integer`  
The tier applied for the Product license key.

**test** `boolean`  
Indicates if it's a test request or not.

**extra** `extra`  
Metadata information.

#### [#](#deal-add-on-specific-attributes) Deal add-on specific attributes:

**partner\_plan\_name** `string`  
Unique identifier for the partner's plan name, specific to deal add-ons only. This ID is collaboratively determined by your team and AppSumo. AppSumo recommends using explicit examples, such as: "add\_on\_user\_seats", "add\_on\_white\_label", etc.

**parent\_license\_key** `string` - UUID  
The license key of the main (parent) deal this add-on belongs to. This key links the add-on’s license to its parent’s license. The add-on will also have its own separate `license_key`.

**unit\_quantity** `integer`  
The number of units purchased for a particular add-on. This value is represented as a integer.

*   Examples include: "1", "5", "15" etc. (in most cases, this unit will be "1")
*   Use Case Example: "15 add on seats" / "5 additional websites" / "1 white-labeling" / "1 integrations pack" etc.

### [#](#extra-object) Extra Object

#### [#](#attributes-2) Attributes

**reason** `string`  
The reason why the webhook was sent.

← [Getting started](/webhook/webhook__getting_started.html) [Webhook Security](/webhook/webhook__security.html) →
