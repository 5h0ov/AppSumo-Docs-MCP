# Connect to AppSumo | AppSumo Licensing API (v2)

# [#](#connect-to-appsumo) Connect to AppSumo

## [#](#allowed-content-types-for-post-requests) Allowed Content Types for `POST` Requests

*   `application/json`
*   `application/x-www-form-urlencoded`

**All responses from AppSumo are returned in JSON format:**

```json
{
    "access_token": "82b35f3d810f4cf49dd7a52d4b22a594",
    "token_type": "bearer",
    "expires_in": 3600,
    "refresh_token": "0bac2d80d75d46658b0b31d3778039bb",
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6"
}
```

## [#](#connecting-to-appsumo-oauth) Connecting to AppSumo (OAuth)

To set up OAuth and obtain your user’s license, follow these four simple steps:

1.  **Save Your OAuth Redirect URL**  
    Before you start, make sure your OAuth Redirect URL is correctly saved and validated in the [AppSumo Partner Portal (opens new window)](https://www.appsumo.com/partners/products/). For more details, refer to the [OAuth Getting Started](/licensing/licensing__getting_started.html) section.  
      
    
2.  **Extract the Code from the OAuth Redirect URL**  
    After a user accepts the OAuth consent, they will be redirected to your specified URL with a `code` parameter included in the query string. You will need this `code` to fetch the `access_token` in the next step.  
      
    **Important:**

*   The `code` is single-use only and will expire after it’s used or the OAuth attempt fails.
*   A new `code` will be issued upon each new OAuth authorization attempt.  
      
    **Example Redirect URL**:

```text
https://your-url.com/?code=1d512d96ba99465ba9942bdf282233ea
```

##### Python

```
# Use your urls.py to use this view (This should be your a type of login page)
from django.views.generic import View
from django.http import HttpResponse
from rest_framework.status import HTTP_200_OK

class MyLoginPage(View):
  def get(self, request, *args, **kwargs):
    content = 'YOUR LOGIN PAGE CONTENT'
    code = request.GET.get('code')

    # Use "code" in the next step to get the "access_token"

    return HttpResponse(content)
```

##### Node.js

```
const express = require('express');
const app = express();
const port = 3000;

app.get('/your-login-page', (req, res) => {
  const { code } = req.query;

  // Use "code" in the next step to get the "access_token"

  res.sendFile( __dirname + "/" + "login.html" );
});

app.listen(port);
```

##### Go

```
package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/your-login-page", func(w http.ResponseWriter, r *http.Request) {
		code := r.URL.Query().Get("code")

    # Use "code" in the next step to get the "access_token"

    http.ServeFile(w, r, "login.html")
	})
	http.ListenAndServe(":3000", nil)
}
```

##### PHP

```
<?php
  $code = $_GET['code'];
  # Use "code" in the next step to get the "access_token"
?>
```

3.  **Fetch a Temporary Access Token**  
    Use the `code` you extracted along with your `client_id`, `client_secret`, and Redirect URL to make a `POST` request to the AppSumo token endpoint. This request will provide you with a temporary `access_token` and `refresh_token`.  
      
    **Endpoint:** `POST https://appsumo.com/openid/token/`  
      
    **Required Data:**

*   `client_id` and `client_secret` (See [OAuth Getting Started](/licensing/licensing__getting_started.html))
*   Your OAuth Redirect URL (must match exactly as saved and validated in the Partner Portal)
*   The OAuth `code` from the previous step
*   `grant_type`: set to `authorization_code` (constant value)  
      
    **Example request**: `POST https://appsumo.com/openid/token/`  
      
    
    Python Node.js Go PHP Curl ![copy-image](/assets/img/copy.07609553.svg) Copy
    
    ```python
    import request
    
    url = 'https://appsumo.com/openid/token/'
    headers = {'Content-type': 'application/json'}
    data = {
      'client_id': '1234567890',
      'client_secret': '1234567890abcdef1234567890abcdef',
      'code': 'fedcba0987654321fedcba0987654321',
      'redirect_uri': 'https://your-url.com/',
      'grant_type': 'authorization_code'
    }
    
    response = requests.post(url, headers=headers, json=data)
    
    # Extract the tokens from the response
    ```
    
      
    **Example response**:

```json
{
    "access_token": "82b35f3d810f4cf49dd7a52d4b22a594",
    "token_type": "bearer",
    "expires_in": 3600,
    "refresh_token": "0bac2d80d75d46658b0b31d3778039bb",
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6...",
    "error": ""
}
```

4.  **Use the Access Token to Fetch the User’s License**  
    To fetch a user’s license, use their `access_token` and send a `GET` request to `https://appsumo.com/openid/license_key/`. AppSumo will provide the user’s license data, which must be linked to the user’s new account on your site.  
      
    **Endpoint:**
    
    ```
    GET https://appsumo.com/openid/license_key/?access_token=YOUR_ACCESS_TOKEN
    ```
    
      
      
    **Example request**:
    
    ##### Python
    
    ```
    import requests
    
    response = requests.get('https://appsumo.com/openid/license_key/?access_token=82b35f3d810f4cf49dd7a52d4b22a594')
    
    # Use the license data from the response to log in the user
    ```
    
    ##### Node.js
    
    ```
    const axios = require('axios').default;
    
    (async function init() {
      const response = await axios({
        method: 'GET',
        url: 'https://appsumo.com/openid/license_key/?access_token=82b35f3d810f4cf49dd7a52d4b22a594',
      });
    
      // Use the license data from the response to log in the user
    })();
    ```
    
    ##### Go
    
    ```
    package main
    
    import (
        "fmt"
        "io"
        "net/http"
    )
    
    type licenseResponse struct {
    	LicenseKey string   `json:"license_key"`
    	Status     string   `json:"status"`
    	Scopes     []string `json:"scopes"`
    }
    
    func main() {
      resp, err := http.Get("https://appsumo.com/openid/license_key/?access_token=82b35f3d810f4cf49dd7a52d4b22a594")
      if err != nil {
        panic(err)
      }
    
      defer resp.Body.Close()
    
      body, err := io.ReadAll(resp.Body)
    
    	if err != nil {
    		panic(err)
    	}
    
      var response licenseResponse
    	err = json.Unmarshal(body, &response)
    
      // Use the license data from the response to log in the user
    }
    ```
    
    ##### PHP
    
    ```
    <?php
      $url = 'https://appsumo.com/openid/license_key/?access_token=82b35f3d810f4cf49dd7a52d4b22a594';
    
      $curl = curl_init($url);
      curl_setopt($curl, CURLOPT_URL, $url);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
    
      $response = curl_exec($curl);
      curl_close($curl);
      var_dump($response);
    
      # Use the license data from the $response to log in the user
    ?>
    ```
    
    ##### Curl
    
    ```
    curl -X GET \
      -H "Cache-Control: no-cache" \
      "https://appsumo.com/openid/license_key/?access_token=82b35f3d810f4cf49dd7a52d4b22a594"
    ```
    
      
    **Example response**:

```json
{
  "license_key": "d8bfa201-d8c0-4bc8-a27c-b1c12efa4a5a",
  "status": "active",
  "scopes": ["read_license"]
}
```

## [#](#expiration-and-refresh-of-access-tokens) Expiration and Refresh of Access Tokens

If you receive a `401 Unauthorized` error when using an `access_token`, it likely means the token has expired. To get a new `access_token`, use the `refresh_token` and send a `POST` request to `https://appsumo.com/openid/token/`. This will return a new temporary `access_token` and `refresh_token`.

**Endpoint**: `POST https://appsumo.com/openid/token/`

**Example request**:

Python Node.js Go PHP Curl ![copy-image](/assets/img/copy.07609553.svg) Copy

```python
import request

url = 'https://appsumo.com/openid/token/'
headers = {'Content-type': 'application/json'}
data = {
  'client_id': '1234567890'
  'client_secret': '1234567890abcdef1234567890abcdef'
  'refresh_token': 'fedcba0987654321fedcba0987654321'
  'grant_type': 'refresh_token'
}

response = requests.post(url, headers=headers, json=data)

# Process the response
```

**Example response**:

```json
{
    "access_token": "82b35f3d810f4cf49dd7a52d4b22a594",
    "token_type": "bearer",
    "expires_in": 3600,
    "refresh_token": "0bac2d80d75d46658b0b31d3778039bb",
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6"
}
```

← [Getting started](/licensing/licensing__getting_started.html) [Next steps](/licensing/licensing__next_steps.html) →
