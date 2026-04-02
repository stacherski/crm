# CRM System

## Overview

Full-stack CRM (Customer Relationship Management) application for
managing companies and user data with authentication and protected API
access.

The project is split into two independent applications: - `frontend` ---
React client - `backend` --- Node.js + Express API with MongoDB

------------------------------------------------------------------------

## Architecture

/frontend → React (UI, routing, API consumption) /backend → Express API
(auth, business logic, DB) /database → MongoDB

-   Authentication via JWT (access + refresh tokens)
-   API documented with Swagger
-   UI built using external design system

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React
-   React Router
-   External UI system:\
    https://github.com/stacherski/design-system

### Backend

-   Node.js
-   Express
-   MongoDB (Mongoose)
-   JWT Authentication (access + refresh tokens)
-   Swagger UI for API docs

------------------------------------------------------------------------

## Installation

### 1. Clone repository

git clone https://github.com/stacherski/crm.git cd crm

------------------------------------------------------------------------

## Backend Setup

cd backend npm install

### Environment Variables

Create `.env` file in `/backend`:

PORT=8080 DATABASE_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

------------------------------------------------------------------------

## Frontend Setup

cd frontend npm install

------------------------------------------------------------------------

## Running the Application

### Backend

npm run npm start

### Frontend

npm run npm run dev

------------------------------------------------------------------------

## API Documentation

http://localhost:8080/api-docs

------------------------------------------------------------------------

## Authentication

Uses JWT access + refresh tokens.

Frontend requests must include: credentials: "include"

------------------------------------------------------------------------

## API Overview

### Auth

-   POST /auth/login
-   POST /auth/logout

### Company

-   GET /api/company/all
-   GET /api/company/query?\_id=`<id>`{=html}

------------------------------------------------------------------------

## Project Structure

/frontend /src /components /pages

/backend /routes /models /middleware /config

------------------------------------------------------------------------

## Design System

https://github.com/stacherski/design-system

------------------------------------------------------------------------

## Notes

-   Enable CORS with credentials on backend
-   Ensure consistent cookie/token configuration
-   Swagger is the API reference
-   Check package.json files for exact scripts

------------------------------------------------------------------------

## License

MIT
