# Getting started | AppSumo Licensing API (v2)

# [#](#getting-started) Getting started

## [#](#prerequisites) Prerequisites

*   An approved application on AppSumo
*   A valid API key

**Header `Content Type`'s allowed for POST requests**

*   `application/json`

## [#](#api-key) API key

You can find your API on your product page in the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/). The key is hidden by default, clicking the eye symbol will make it visible.

![Licensing OAuth keys](data:image/png;base64,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)

Using your API key you can get license information about your application. There are two types of information you can query:

1.  Licensing
2.  Your Profile

In order to access this information you'll need to make a request. _(See [Making the request](#making-the-request))_. **All requests are rate limited to 20 requests per minute**

## [#](#making-the-request) Making the request

Using your API, you will make either a request to our server using one of the endpoints below. The request must include a header key called `X-AppSumo-Licensing-Key` with the value being your API key.

Example request:

`GET /v2/licenses/:license_key`

##### Python

```
import requests

headers = {'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43'}
url = 'https://api.licensing.appsumo.com/v2/licenses/d8bfa201-d8c0-4bc8-a27c-b1c12efa4a5a'
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
    url: 'https://api.licensing.appsumo.com/v2/licenses/d8bfa201-d8c0-4bc8-a27c-b1c12efa4a5a',
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
  url := "https://api.licensing.appsumo.com/v2/licenses/d8bfa201-d8c0-4bc8-a27c-b1c12efa4a5a"
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
  $url = 'https://api.licensing.appsumo.com/v2/licenses/d8bfa201-d8c0-4bc8-a27c-b1c12efa4a5a';

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
  "https://api.licensing.appsumo.com/v2/licenses/d8bfa201-d8c0-4bc8-a27c-b1c12efa4a5a"
```

Example response:

```json
{
  "license_key": "d8bfa201-d8c0-4bc8-a27c-b1c12efa4a5a",
  "license_redemption_url":"https://appsumo.com/licensing/a81169a1-eb05-4db8-8d65-2d1a8d5af719/redeem/",
  "license_change_plan_url":"https://appsumo.com/licensing/a81169a1-eb05-4db8-8d65-2d1a8d5af719/change_plan/",
  "status": "active",
  "tier": 1,
  "created_at": "2022-01-01 00:00:00+00",
  "updated_at": "2022-01-01 00:00:00+00"
}
```

## [#](#quick-start) Quick start

Here is a list of all the endpoints that is available to all AppSumo Partners. Using your API key you can make requests to get information on your application's licenses or partner profile.

### [#](#base-api-url) Base API URL

```text
	https://api.licensing.appsumo.com/v2/
```

### [#](#licensing-api) Licensing API

_For more details see [License API](/api/api__license.html)_

```text
	GET `/licenses`
	GET `/licenses/events`
	GET `/licenses/:license_key`
	GET `/licenses/:license_key/events`
	GET `/licenses/:license_key/webhook-responses`
```

### [#](#partner-profile-api) Partner profile API

_For more details see [Partner profile API](/api/api__profile.html)_

```text
	GET    `/profile`
	PUT    `/profile`
	POST   `/profile/contact`
	DELETE `/profile/contact:contact_id`
```

← [Overview](/api/api__overview.html) [Licensing API](/api/api__license.html) →
