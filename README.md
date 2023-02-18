# Crypto Compare

## About this project

This is a cryptocurrency application built in Typescript, NextJS and styled with the styled components library. The application accesses Crypto market and token data with the free coingecko API and utilises Supabase for authentication and database queries.

The project is hosted on [Vercel.](https://crypto-compare-one.vercel.app/)

## Project Screenshots

<div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
    <img src="https://user-images.githubusercontent.com/57725070/219857928-c3907bf3-905b-4200-9fd1-fcdd3eaf91fe.PNG" alt="markets-page" style="width: 150px; height: auto;"/>
    <img src="https://user-images.githubusercontent.com/57725070/219857921-7d9dc5d9-9e39-4d85-8c5e-58f70f73607d.PNG" alt="portfolio-page" style="width: 150px; height: auto;"/>
    <img src="https://user-images.githubusercontent.com/57725070/219857923-751b63d8-68ef-419a-b0fd-cbbbe846ff4a.PNG" alt="trending-page" style="width: 150px; height: auto;"/>
    <img src="https://user-images.githubusercontent.com/57725070/219857925-881ce244-8aa7-4131-8b40-292491f42ca8.PNG" alt="compare-page" style="width: 150px; height: auto;"/>
    <img src="https://user-images.githubusercontent.com/57725070/219857927-79bc3ba6-cbac-4c06-93ea-2d342d95d9fe.PNG" alt="compare-page2" style="width: 150px; height: auto;"/>
</p>

## How I organized this project

I used a Figma community made design kit for styling inspiration [example](https://user-images.githubusercontent.com/57725070/219866826-c868ed24-b343-4a4a-88c7-6d82b97ca9c3.PNG).

I structured my tasks with a Jira board [example](https://user-images.githubusercontent.com/57725070/219866834-a47c052f-a422-4cd7-911e-1ec9823b839d.PNG).

## How I built this project

Authentication with useContext and supabase.

Protected and unprotected routes with HOCs.

This application fetches data from the coingeckoAPI and is mostly server-side rendered.

Wrote integration tests using React Testing Library.

## Why I built the project in this way

For authentication and auth state management I utilised supabase and react context hooks to avoid building a seperate node server which saved on build time. [I had previously built the backend of a full stack application from scratch](https://github.com/Andybrummitt/bug-tracker/tree/main/server) and felt that supabase could cover the needs for this application in a less verbose way.

I used NextJS's built in server side rendering to improve page load and SEO for most of my API calls. This was not needed however in the portfolio section of the app as this is a behind protected route and would not require SEO.

I wrote integration tests with React testing library, but due to time constraints did not write automated tests for the full application.
