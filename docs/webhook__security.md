# Webhook Security | AppSumo Licensing API (v2)

# [#](#webhook-security) Webhook Security

## [#](#overview) Overview

When data is exchanged over the internet, there is a risk of interception and modification, known as a man-in-the-middle attack. To protect against this, AppSumo includes security measures in every webhook sent to partners.

![Man-in-the-middle](/assets/img/webhook-Man-in-the-middle.33780565.png)

### [#](#message-authenticity) Message Authenticity

Each webhook from AppSumo contains two security headers that help validate the integrity of the message, ensuring it has not been altered.

![Message-Authenticity](/assets/img/webhook-Message-Authenticity.6fe02fb0.png)

## [#](#hmac-sha256) HMAC SHA256

AppSumo uses the HMAC SHA256 algorithm, which creates a secure, one-way encryption to verify that the received data is exactly as sent.

*   **How It Works:**
    *   AppSumo and the partner share an API Key used for both encryption and API requests.
    *   AppSumo creates a message by combining a timestamp with the request body and encrypts it using the shared API Key _(See [API: Getting started](/api/api__getting_started.html))_
    *   This encrypted message (SHA) is sent to the partner in the HTTP header `X-Appsumo-Signature`.
    *   The timestamp is sent in the HTTP header `X-Appsumo-Timestamp`, and the data is sent in unencrypted JSON format in the request body.
*   **Validation Process:**
    *   The partner receives the timestamp and data, combines them to form a single message, and encrypts it using the API Key.
    *   The partner then compares the generated SHA with the value in `X-Appsumo-Signature`.
    *   If they match, the request is confirmed as authentic and unmodified.

## [#](#verifying-webhook-requests-optional) Verifying webhook requests (Optional)

The following codes are example of how an AppSumo Partner can generate the SHA with the data sent by AppSumo and compare both SHA message.

##### Python

```
import hashlib
import hmac


def main():
  # The Partner finds their Api Key in their Partner Portal along with their Partner Secrets.
  api_key = "c73455d8-0f64-4354-bd64-1f454a227104"

  # Get from X-Appsumo-Timestamp http header
  timestamp = 1625165884119

  # Get from X-Appsumo-Signature http header
  sha = "0da6df1c6e242c1ee2ae833c8f1e284411d40ca5246968dee9419b7da8eb67e3"

  # Get from request body
  body = '{"license_key":"3794577c-3dbc-11ec-9bbc-0242ac130002","event":"purchase","status":"active","event_timestamp":1318781876406,"test":false}'

  # build the message
  message = "{}{}".format(timestamp, body)

  # Generate sha
  signature = hmac.new(
      key=bytes(api_key, 'utf-8'),
      msg=bytes(message, 'utf-8'),
      digestmod=hashlib.sha256
  ).hexdigest()

  # compare generated signature with the one received from X-Appsumo-Signature
  # to make sure it is a trusted request
  print(signature == sha)


if __name__ == '__main__':
  main()
```

##### Node.js

```
const crypto = require('crypto');

// The Partner finds their Api Key in their Partner Portal along with their Partner Secrets.
const apiKey = "c73455d8-0f64-4354-bd64-1f454a227104";

// Get from X-Appsumo-Timestamp http header
const timestamp = 1625165884119;
// Get from X-Appsumo-Signature http header
const sha = "0da6df1c6e242c1ee2ae833c8f1e284411d40ca5246968dee9419b7da8eb67e3";
// Get from request body
const body = '{"license_key":"3794577c-3dbc-11ec-9bbc-0242ac130002","event":"purchase","status":"active","event_timestamp":1318781876406,"test":false}';

// build the message
const message = `${timestamp}${body}`;

const signature = crypto.createHmac('SHA256', apiKey)
    .update(message)
    .digest('hex');

console.log(signature === sha);
```

##### Go

```
package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func main() {
	// The Partner finds their Api Key in their Partner Portal along with their Partner Secrets.
	apiKey := "c73455d8-0f64-4354-bd64-1f454a227104"

	// Get from X-Appsumo-Timestamp http header
	timestamp := 1625165884119

	// Get from X-Appsumo-Signature http header
	sha := "0da6df1c6e242c1ee2ae833c8f1e284411d40ca5246968dee9419b7da8eb67e3"

	// Get from request body
	body := `{"license_key":"3794577c-3dbc-11ec-9bbc-0242ac130002","event":"purchase","status":"active","event_timestamp":1318781876406,"test":false}`

	// build the message
	message := fmt.Sprintf("%d%s", timestamp, body)

	// Generate sha
	apiKeyByte := []byte(apiKey)
	data := []byte(message)
	h := hmac.New(sha256.New, apiKeyByte)
	h.Write(data)
	signature := hex.EncodeToString(h.Sum(nil))
	fmt.Println(signature == sha)
}
```

##### PHP

```
<?php
  // The Partner finds their Api Key in their Partner Portal along with their Partner Secrets.
  $api_key = 'c73455d8-0f64-4354-bd64-1f454a227104';

  // Get from X-Appsumo-Timestamp http header
  $timestamp = 1625165884119;

  // Get from X-Appsumo-Signature http header
  $sha = '0da6df1c6e242c1ee2ae833c8f1e284411d40ca5246968dee9419b7da8eb67e3';

  // Get from request body
  $body = '{"license_key":"3794577c-3dbc-11ec-9bbc-0242ac130002","event":"purchase","status":"active","event_timestamp":1318781876406,"test":false}';

  // build the message
  $message = "$timestamp$body";
  $signature = hash_hmac('sha256', $message, $api_key);

  echo $signature === $sha;
?>
```

← [Connect to AppSumo](/webhook/webhook__connect.html) [Overview](/api/api__overview.html) →
