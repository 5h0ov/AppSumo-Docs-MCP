# Licensing API | AppSumo Licensing API (v2)

# [#](#licensing-api) Licensing API

For more information about licenses, events, or webhook-responses see [Key terms](#key-terms))

## [#](#endpoints) Endpoints

### [#](#get-v2-licenses) `GET` `/v2/licenses`

Gets all the licenses for you application

#### [#](#query-parameters) Query parameters

*   `status` _(See [Status types](#status-types))_.
*   `page` _(See [Pagination](#pagination))_.
*   `limit` _(See [Pagination](#pagination))_.

#### [#](#example-request) Example request

```
GET https://api.licensing.appsumo.com/v2/licenses?limit=1&page=1&status=active
```

##### Python

```
import requests

headers = {'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43'}
url = 'https://api.licensing.appsumo.com/v2/licenses?limit=1&page=1&status=active'
response = requests.get(url, headers=headers)

# Process the response
```

##### Node.js

```
const axios = require('axios').default;

(async function init() {
    const response = await axios({
    method: 'GET',
    headers: { 'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43' },
    url: 'https://api.licensing.appsumo.com/v2/licenses?limit=1&page=1&status=active',
  });

  // Process the response
})();
```

##### Go

```
package main

import (
  "encoding/json"
	"io"
	"net/http"
	"time"
)

type licenseResponse struct {
	LicenseKey string    `json:"license_key"`
	Status     string    `json:"status"`
	Tier       int8      `json:"tier"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

func main() {
  url := "https://api.licensing.appsumo.com/v2/licenses?limit=1&page=1&status=active"
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("X-AppSumo-Licensing-Key", "94b5fb6f-4b5f-453c-b8f5-83ae071e2d43")
	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		panic(err)
	}

	var response licenseResponse
	json.Unmarshal(body, &response)

	// Process the response
}
```

##### PHP

```
<?php
  $url = 'https://api.licensing.appsumo.com/v2/licenses?limit=1&page=1&status=active';

  $curl = curl_init($url);
  $headers = array('X-AppSumo-Licensing-Key: 94b5fb6f-4b5f-453c-b8f5-83ae071e2d43');

  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($curl);
  curl_close($curl);
  var_dump($response);

  # Process the $response
?>
```

##### Curl

```
curl -X GET \
  -H "Cache-Control: no-cache" \
  -H "X-AppSumo-Licensing-Key: 94b5fb6f-4b5f-453c-b8f5-83ae071e2d43" \
  "https://api.licensing.appsumo.com/v2/licenses?limit=1&page=1&status=active"
```

#### [#](#example-response) Example response

```json
{
  "size": 1,
  "items": [{
    "license_key": "1ed6fdd3-f772-4b91-b12d-efb772d23cc0",
    "license_redemption_url":"https://appsumo.com/licensing/a81169a1-eb05-4db8-8d65-2d1a8d5af719/redeem/",
    "license_change_plan_url":"https://appsumo.com/licensing/a81169a1-eb05-4db8-8d65-2d1a8d5af719/change_plan/",
    "status": "active",
    "tier": 1,
    "created_at": "2022-03-29T17:21:57.444033Z",
    "updated_at": "2022-03-29T17:23:14.791672Z"
  }]
}
```

### [#](#get-v2-licenses-events) `GET` `/v2/licenses/events`

Gets all the license events for you application. Webhook `responses` are limited to 10 items. If you need to see more responses, use the `license_key` in [webhook-responses](#get-licenses-license-key-webhook-responses)

#### [#](#query-parameters-2) Query parameters

*   `status` _(See [Status types](#status-types))_.
*   `page` _(See [Pagination](#pagination))_.
*   `limit` _(See [Pagination](#pagination))_.

#### [#](#example-request-2) Example request

```
GET https://appsumo.com/v2/licenses/events?limit=1&page=1&status=active
```

Python Node.js Go PHP Curl ![copy-image](/assets/img/copy.07609553.svg) Copy

```python
import requests

headers = {'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43'}
url = 'https://api.licensing.appsumo.com/v2/licenses/events?limit=1&page=1&status=active'
response = requests.get(url, headers=headers)

# Process the response
```

#### [#](#example-response-2) Example response

```json
{
  "size": 1,
  "items": [{
    "event_id": 33,
    "event": "purchase",
    "tier": 1,
    "license_key": "2191a2c1-01a9-4060-8067-1b466484f21b",
    "responses": {
      "size": 10,
      "items": [{
        "webhook_id": 5,
        "event": "purchase",
        "license_key": "2191a2c1-01a9-4060-8067-1b466484f21b",
        "request_header": "",
        "request_body": "{\"license_key\":\"2191a2c1-01a9-4060-8067-1b466484f21b\",\"event\":\"purchase\",\"license_status\":\"inactive\",\"event_timestamp\":1650488393814}",
        "response_status": 404,
        "response_body": "Not Found",
        "response_time": 208,
        "url": "https://your-url.com/appsumo-webhook",
        "success": false,
        "created_at": "2022-04-20T20:59:54.023683Z",
        "updated_at": "2022-04-20T20:59:54.023683Z"
      }]
    }
  }]
}
```

### [#](#get-licenses-license-key) `GET` `/licenses/:license_key`

Gets the information pertaining to a specific a license

#### [#](#url-parameters) URL parameters

*   `:license_key` The user's license key

#### [#](#example-request-3) Example request

```
GET https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b
```

##### Python

```
import requests

headers = {'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43'}
url = 'https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b'
response = requests.get(url, headers=headers)

# Process the response
```

##### Node.js

```
const axios = require('axios').default;

(async function init() {
    const response = await axios({
    method: 'GET',
    headers: { 'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43' },
    url: 'https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b',
  });

  // Process the response
})();
```

##### Go

```
package main

import (
  "encoding/json"
	"io"
	"net/http"
	"time"
)

type licenseResponse struct {
	LicenseKey string    `json:"license_key"`
	Status     string    `json:"status"`
	Tier       int8      `json:"tier"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

func main() {
  url := "https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b"
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("X-AppSumo-Licensing-Key", "94b5fb6f-4b5f-453c-b8f5-83ae071e2d43")
	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		panic(err)
	}

	var response licenseResponse
	json.Unmarshal(body, &response)

	// Process the response
}
```

##### PHP

```
<?php
  $url = 'https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b';

  $curl = curl_init($url);
  $headers = array('X-AppSumo-Licensing-Key: 94b5fb6f-4b5f-453c-b8f5-83ae071e2d43');

  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($curl);
  curl_close($curl);
  var_dump($response);

  # Process the $response
?>
```

##### Curl

```
curl -X GET \
  -H "Cache-Control: no-cache" \
  -H "X-AppSumo-Licensing-Key: 94b5fb6f-4b5f-453c-b8f5-83ae071e2d43" \
  "https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b"
```

#### [#](#example-response-3) Example response

```json
{
  "license_key": "2191a2c1-01a9-4060-8067-1b466484f21b",
  "license_redemption_url":"https://appsumo.com/licensing/a81169a1-eb05-4db8-8d65-2d1a8d5af719/redeem/",
  "license_change_plan_url":"https://appsumo.com/licensing/a81169a1-eb05-4db8-8d65-2d1a8d5af719/change_plan/",
  "status": "inactive",
  "tier": 1,
  "created_at": "2022-04-20T20:59:53.796937Z",
  "updated_at": "2022-04-20T20:59:53.796937Z"
}
```

### [#](#get-licenses-license-key-events) `GET` `/licenses/:license_key/events`

Gets the license events pertaining to a specific a license. Webhook `responses` are limited to 10 items. If you need to see more responses, use the `license_key` in [webhook-responses](#get-licenses-license-key-webhook-responses)

#### [#](#url-parameters-2) URL parameters

*   `:license_key` The user's license key

#### [#](#query-parameters-3) Query parameters

*   `page` _(See [Pagination](#pagination))_.
*   `limit` _(See [Pagination](#pagination))_.

#### [#](#example-request-4) Example request

```
GET https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b/events?limit=1&page=1
```

Python Node.js Go PHP Curl ![copy-image](/assets/img/copy.07609553.svg) Copy

```python
import requests

headers = {'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43'}
url = 'https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b/events?limit=1&page=1'
response = requests.get(url, headers=headers)

# Process the response
```

#### [#](#example-response-4) Example response

```json
{
  "size": 1,
  "items": [{
    "event_id": 33,
    "event": "purchase",
    "tier": 1,
    "license_key": "2191a2c1-01a9-4060-8067-1b466484f21b",
    "responses": {
      "size": 10,
      "items": [{
        "webhook_id": 5,
        "event": "purchase",
        "license_key": "2191a2c1-01a9-4060-8067-1b466484f21b",
        "request_header": "",
        "request_body": "{\"license_key\":\"2191a2c1-01a9-4060-8067-1b466484f21b\",\"event\":\"purchase\",\"license_status\":\"inactive\",\"event_timestamp\":1650488393814}",
        "response_status": 404,
        "response_body": "Not Found",
        "response_time": 208,
        "url": "https://your-url.com/appsumo-webhook",
        "success": false,
        "created_at": "2022-04-20T20:59:54.023683Z",
        "updated_at": "2022-04-20T20:59:54.023683Z"
      }]
    }
  }]
}
```

### [#](#get-licenses-license-key-webhook-responses) `GET` `/licenses/:license_key/webhook-responses`

Gets the webhook responses pertaining to a specific a license

#### [#](#url-parameters-3) URL parameters

*   `:license_key` - The user's license key

#### [#](#query-parameters-4) Query parameters

*   `page` _(See [Pagination](#pagination))_.
*   `limit` _(See [Pagination](#pagination))_.

#### [#](#example-request-5) Example request

```
GET https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b/webhook-responses?limit=1&page=1
```

##### Python

```
import requests

headers = {'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43'}
url = 'https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b/webhook-responses?limit=1&page=1'
response = requests.get(url, headers=headers)

# Process the response
```

##### Node.js

```
const axios = require('axios').default;

(async function init() {
    const response = await axios({
    method: 'GET',
    headers: { 'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43' },
    url: 'https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b/webhook-responses?limit=1&page=1',
  });

  // Process the response
})();
```

##### Go

```
package main

import (
  "encoding/json"
	"io"
	"net/http"
	"time"
)

type licenseResponse struct {
	LicenseKey string    `json:"license_key"`
	Status     string    `json:"status"`
	Tier       int8      `json:"tier"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

func main() {
  url := "https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b/webhook-responses?limit=1&page=1"
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("X-AppSumo-Licensing-Key", "94b5fb6f-4b5f-453c-b8f5-83ae071e2d43")
	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		panic(err)
	}

	var response licenseResponse
	json.Unmarshal(body, &response)

	// Process the response
}
```

##### PHP

```
<?php
  $url = 'https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b/webhook-responses?limit=1&page=1';

  $curl = curl_init($url);
  $headers = array('X-AppSumo-Licensing-Key: 94b5fb6f-4b5f-453c-b8f5-83ae071e2d43');

  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  $response = curl_exec($curl);
  curl_close($curl);
  var_dump($response);

  # Process the $response
?>
```

##### Curl

```
curl -X GET \
  -H "Cache-Control: no-cache" \
  -H "X-AppSumo-Licensing-Key: 94b5fb6f-4b5f-453c-b8f5-83ae071e2d43" \
  "https://api.licensing.appsumo.com/v2/licenses/2191a2c1-01a9-4060-8067-1b466484f21b/webhook-responses?limit=1&page=1"
```

#### [#](#example-response-5) Example response

```json
{
  "size": 1,
  "items": [{
    "webhook_id": 5,
    "event": "purchase",
    "license_key": "2191a2c1-01a9-4060-8067-1b466484f21b",
    "request_header": "\"content-type\":\"application/json; charset=UTF-8\"",
    "request_body": "{\"license_key\":\"2191a2c1-01a9-4060-8067-1b466484f21b\",\"event\":\"purchase\",\"license_status\":\"inactive\",\"event_timestamp\":1650488393814}",
    "response_status": 404,
    "response_body": "Not Found",
    "response_time": 208,
    "url": "https://your-url.com/appsumo-webhook",
    "success": false,
    "created_at": "2022-04-20T20:59:54.023683Z",
    "updated_at": "2022-04-20T20:59:54.023683Z"
  }]
}
```

## [#](#status-types) Status types

*   `inactive` - Inactive licenses
*   `active` - Active licenses
*   `deactivated` - Deactivated licenses

## [#](#pagination) Pagination

Pagination allows you to greater control on the amount of information received.

*   `page` - The current page (a group of results)
*   `limit` - The maximum number of results returned for that page

(_Note: `page` starts a 1 and the `limit` maximum number is 100_)

Example:

```json
https://www.appsumo.com/v2/licenses/571c5f3a-42e1-4b25-b209-a46f905462f6?page=2&limit=100
```

This (assuming they exist) will return the second 100 results (100 - 199)

## [#](#key-terms) Key terms

### [#](#license) License

This is the license that a user has. Using the license key attched to the license, you can request information about it.

### [#](#events) Events

When an action is performed on a license, a record of the event is saved.

License events:

*   `activate` - A license is activated
*   `deactivate` - A licenses is deactivated
*   `purchase` - A license is purchased

### [#](#webhook-reponses) Webhook reponses

Anytime a license event is performed, a webhook request is made. This request is saved including the response from your application.

← [Getting started](/api/api__getting_started.html) [Partner profile API](/api/api__profile.html) →
