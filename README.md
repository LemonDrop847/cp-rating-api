# Competitive Rating API

An API endpoint to get competitive programming ratings from various platforms.

## Current Platforms
``` 
- Codechef 
- Codeforces
- LeetCode
```

# API Endpoints
Base URL- https://cp-rating-api.vercel.app/

## Available endpoints
- ### /codechef/[username]
    ``` 
    Response-
    {
    "rating": [rating],
    "country": [country],
    "globalRank": [global rank],
    "countryRank": [country rank],
    "puzzleRating": [puzzle rating],
    "onevsoneRating": [1v1 rating],
    "participation": [no of contests],
    "color": [rating color],
    "problemsSolved": [completely solved problems],
    "partialProblems": [partially solved problems],
    "contests": [ - Array of all contests participated-  ]
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
- ### /leetcode/[username]
    ```
    Response-
    {
    "user": {username},
    "rank": {ranking},
    "problemsSolved": {no of problems solved},
    "languages": [
        {
        "languageName": {language},
        "problemsSolved": {no of problems}
        }
    ],
    "totalProblems": {current total problems on leetcode},
    "submissions": [
        {
        "difficulty": "All",
        "count": {no of problems},
        "submissions": {total submissions}
        },
        {
        "difficulty": "Easy",
        "count": {no of problems},
        "submissions": {total submissions}
        },
        {
        "difficulty": "Medium",
        "count": {no of problems},
        "submissions": {total submissions}
        },
        {
        "difficulty": "Hard",
        "count": {no of problems},
        "submissions": {total submissions}
        }
    ]
    }
    ```

To get <i>shields.io</i> badges with your rating, use these examples-

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

- Leetcode
    ```
    ![Leetcode badge](https://img.shields.io/endpoint?style=for-the-badge&url=https%3A%2F%2Fcp-rating-api.vercel.app%2Fleetcode%2Fbadge%2F[USERNAME]&cacheSeconds=86400)
    ```
    Replace [USERNAME] with leetcode username.
