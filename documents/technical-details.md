Technical Architecture - How the system will be implemented

Built with Astro

Assets will be downloaded at build time from an API and the website will be static

the API routes are as follows

1. getCategories
Endpoint: /.netlify/functions/getCategories
Method: GET
Description: Retrieves all categories from the Notion database
Response: Array of category objects with name, type, and options
Return type: Category[]

2. getMarkdownFromReview
Endpoint: /.netlify/functions/getMarkdownFromReview
Method: GET
Query Parameters: pageId (required) - The Notion page ID
Description: Retrieves a review as markdown from a Notion page ID
Response: String of review markdown

1. getAllReviews
Endpoint: /.netlify/functions/getAllReviews
Method: GET
Description: Retrieves all reviews from the Notion database
Response: Object containing an array of review objects
Return type: ReviewDatabaseRow[]