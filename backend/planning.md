# Endpoints necessary:

## Company Data:
- Get companies list:
    - /companies/get
        - params:
            - [optional] start
            - [optional] count
            - [optional] query
        - security:
            - public
        - caching: none
- Get resources used by the website
    - /companies/{company id}/{resource}
        - params:
            - company name: id of the company (can be queried by `/companies/get`)
            - resource: what data is requested? Note: all data will be proxied
                - logo
                - sources
        - security:
            - only [ismyinternshipcancelled.com](https://ismyinternshipcancelled.com) can access these links
        - caching: strong

## Comments
- Get comments:
    - /comments/{company id}/get
        - params:
            - [optional] start
            - [optional] count
            - [optional, default=newest] order (newest|oldest)
        - security:
            - only [ismyinternshipcancelled.com](https://ismyinternshipcancelled.com) can access this endpoint
        - caching: none
    - /comments/{company id}/post
        - params:
            - comment
        - security:
            - authentication required (by OAuth)
                - Google
                - Microsoft
                - Apple?
                - Facebook
                - GitHub
                - LinkedIn?
            - IP rate limited (1 comment/min)
                - failure returns `{'status': 'failure', 'error': 'ratelimited'}`
            - Sanitization
                - sanitize out html/css
                - failure returns `{'status`: 'failure', 'error': 'invalid characters detected}`

## Analytics (future)
- Get number of companies in each category: (basically useless as `/companies/get` does the same)
    - /analytics/status