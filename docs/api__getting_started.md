# Getting started | AppSumo Licensing API (v2)

# [#](#getting-started) Getting started

## [#](#prerequisites) Prerequisites

*   An approved application on AppSumo
*   A valid API key

**Header `Content Type`'s allowed for POST requests**

*   `application/json`

## [#](#api-key) API key

You can find your API on your product page in the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/). The key is hidden by default, clicking the eye symbol will make it visible.

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
