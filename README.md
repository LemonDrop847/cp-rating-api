# Competitive Rating API

An API endpoint to get competitive programming ratings from various platforms.

## Current Platforms
``` 
- Codechef 
- Codeforces
```

# API Endpoints
Base URL- https://cp-rating-api.vercel.app/

## Available endpoints
- ### /codechef/[username]
    ``` 
    Response-
    {
    "rating": [rating],
    "color": [rating color]
    }
    ```
- ### /codeforces/[username]
    ```
    Response-
    {
    "rating": [current rating],
    "titlePhoto": [photoURL],
    "rank": [current rank],
    "handle": [username],
    "maxRating": [max_rating],
    "color": [rank color],
    }
    ```

To get <i>shields.io</i> codechef or codeforeces badge with your rating, use these examples-

- Codechef

    ```
    ![Codechef badge](https://img.shields.io/endpoint?style=for-the-badge&url=https%3A%2F%2Fcp-rating-api.vercel.app%2Fcodechef%2Fbadge%2F[USERNAME]&cacheSeconds=86400)
    ```
    Replace [USERNAME] with codeforces username.
- Codeforces
    ```
    ![Codeforces badge](https://img.shields.io/endpoint?style=for-the-badge&url=https%3A%2F%2Fcp-rating-api.vercel.app%2Fcodeforces%2Fbadge%2F[USERNAME]&cacheSeconds=86400)
    ```
    Replace [USERNAME] with codeforces username.
