# Partner profile API | AppSumo Licensing API (v2)

# [#](#partner-profile-api) Partner profile API

For more information about contacts or profile urls see [Key terms](#key-terms))

## [#](#endpoints) Endpoints

### [#](#get-profile) `GET` `/profile`

Gets your profile information

#### [#](#example-request) Example request

`GET https://api.licensing.appsumo.com/v2/profile`

##### Python

```
import requests

headers = {'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43'}
url = 'https://api.licensing.appsumo.com/v2/profile'
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
    url: 'https://api.licensing.appsumo.com/v2/profile',
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
  url := "https://api.licensing.appsumo.com/v2/profile"
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
  $url = 'https://api.licensing.appsumo.com/v2/profile';

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
  "https://api.licensing.appsumo.com/v2/profile"
```

#### [#](#example-response) Example response

```json
{
  "profile_id": 1,
  "webhook_url": "https://your-url.com/appsumo-webhook",
  "redirect_url": "https://your-url.com/",
  "contacts": {
    "size": 1,
    "items": [{
      "contact_id": 1,
      "name": "Support",
      "email": "support@your-url.com",
      "created_at": "2022-03-29T17:09:06.430447Z",
      "updated_at": "2022-03-29T17:09:06.430447Z"
    }]
  },
  "created_at": "2022-03-29T17:09:05.478031Z",
  "updated_at": "2022-05-04T16:57:27.136789Z"
}
```

### [#](#post-profile-contact) `POST` `/profile/contact`

Add a contact to your partner profile

#### [#](#field-parameters) Field parameters

*   `email` - Your contact's email
*   `name` - Your contact's name

#### [#](#example-request-2) Example request

```
POST https://api.licensing.appsumo.com/v2/profile/contact
```

Python Node.js Go PHP Curl ![copy-image](/assets/img/copy.07609553.svg) Copy

```python
import requests

url = 'https://api.licensing.appsumo.com/v2/profile/contact/'
headers = {
  'Content-type': 'application/json',
  'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43'
}
data = {
  'name': 'Beckett Mariner'
  'email': 'mariner@your-url.com'
}

response = requests.post(url, headers=headers, data=data)

# View the response
```

#### [#](#example-response-2) Example response

```json
{
  "contact_id": 19,
  "name": "Beckett Mariner",
  "email": "mariner@your-url.com",
  "created_at": "2022-05-06T16:32:30.241060816Z",
  "updated_at": "2022-05-06T16:32:30.241060816Z"
}
```

### [#](#delete-profile-contact-contact-id) `DELETE` `/profile/contact/:contact_id`

Delete a contact from your contact list

#### [#](#url-parameters) URL parameters

*   `:contact_id` - The contact's ID. This can be fetched from `GET` `/profile`

#### [#](#example-request-3) Example request

```
POST https://api.licensing.appsumo.com/v2/profile/contact/19
```

##### Python

```
import requests

url = 'https://api.licensing.appsumo.com/v2/profile/contact/19'
headers = { 'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43' }
response = requests.delete(url, headers=headers)

# View the response
```

##### Node.js

```
const axios = require('axios').default;

(async function init() {
  const response = await axios({
    method: 'DELETE',
    url: 'https://api.licensing.appsumo.com/v2/profile/contact/19',
    headers: { 'X-AppSumo-Licensing-Key': '94b5fb6f-4b5f-453c-b8f5-83ae071e2d43' },
  });

  // View the response
})();
```

##### Go

```
package main

import (
	"io"
	"net/http"
)

func main() {
	url := "https://api.licensing.appsumo.com/v2/profile/contact/19"

	req, err := http.NewRequest("DELETE", url, nil)
	req.Header.Set("X-AppSumo-Licensing-Key", "94b5fb6f-4b5f-453c-b8f5-83ae071e2d43")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		panic(err)
	}

	response := string(body)

	// View the response
}
```

##### PHP

```
<?php
  $url = 'https://api.licensing.appsumo.com/v2/profile/contact/19';
  $headers = array(
    'X-AppSumo-Licensing-Key: 94b5fb6f-4b5f-453c-b8f5-83ae071e2d43',
  );

  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

  $response = curl_exec($ch);
  curl_close($ch);

  var_dump($response);

  # View the $response
?>
```

##### Curl

```
curl -X DELETE \
  -H "Cache-Control: no-cache" \
  -H "X-AppSumo-Licensing-Key: 94b5fb6f-4b5f-453c-b8f5-83ae071e2d43" \
  "http://localhost:8080/v2/profile/contact/19"
```

#### [#](#example-response-3) Example response

```text
Contact deleted
```

## [#](#key-terms) Key terms

### [#](#contacts) Contacts

Adding a contact can be very important if AppSumo needs to contact you in the event that AppSumo cannot make requests to your application.

### [#](#profile-urls) Profile URLS

The redirect and webhook URLs are the same as the ones that can be found on the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/). Using the API can be an option to programmatically update them if needed.

← [Licensing API](/api/api__license.html) [OAuth FAQ](/faq/faq__oauth.html) →
