# Finance Data Processing & Access Control Backend

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [Environment Variables](#environment-variables)
7. [API Endpoints](#api-endpoints)
8. [API Documentation](#api-documentation)
9. [Sample API Usage](#sample-api-usage)
10. [Design Decisions](#design-decisions)
11. [Assumptions](#assumptions)
12. [Trade-offs](#trade-offs)
13. [Future Improvements](#future-improvements)
14. [Deployment Note](#deployment-note)
15. [Author](#author)
16. [Declaration](#declaration)

## Quick Navigation

- API Documentation is available in the **"API Documentation"** section below.
- Sample requests are provided under **"Sample API Usage"** for quick testing.


## Overview

This project is a backend system designed to manage financial records with secure access control and dashboard analytics.

It simulates a real-world finance dashboard where different users interact with financial data based on their assigned roles.

---

## Tech Stack

* Node.js
* Express.js
* Prisma ORM
* SQLite (for local development)
* JWT Authentication

---

## Features

### Authentication

* User registration
* User login using JWT tokens
* Secure access to protected APIs

---

### Role-Based Access Control

* **Viewer**

  * Can view records and dashboard data

* **Analyst**

  * Can view and create records
  * Can access analytics

* **Admin**

  * Full access to manage records and users

---

### Financial Records Management

* Create, read, update, and delete records

* Each record includes:

  * Amount
  * Type (Income / Expense)
  * Category
  * Date
  * Notes

* Filtering support:

  * By type
  * By category
  * By date range

* Pagination and search support

---

### Dashboard APIs

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Monthly trends
* Recent transactions

---

### Security Features

* JWT-based authentication
* Role-based authorization
* Rate limiting to prevent API abuse

---

### Advanced Features

* Soft delete (records are not permanently removed)
* Restore deleted records
* Centralized error handling
* Input validation using Joi
* Standardized API response format

---

## Project Structure

```
src/
 ├── controllers/   # Request and response handling
 ├── services/      # Business logic
 ├── routes/        # API route definitions
 ├── middleware/    # Authentication, RBAC, error handling
 ├── config/        # Database configuration
 ├── utils/         # Validation utilities
 └── app.js         # Application entry point
```

---

## Setup Instructions

```bash
git clone <your-repo-url>
cd finance-backend
npm install
npx prisma migrate dev
npm run dev
```

## Running the Project

After starting the server:

Server runs at:
http://localhost:5000

Test API:
GET http://localhost:5000/

Expected response:
Backend is running


---

## Environment Variables

```
DATABASE_URL="file:./dev.db"
JWT_SECRET=your_secret_key
PORT=5000
```

---

## API Endpoints

### Authentication

* POST /auth/register
* POST /auth/login

### Users (Admin Only)

* GET /users
* PUT /users/:id/role
* PUT /users/:id/status

### Financial Records

* POST /records
* GET /records
* PUT /records/:id
* DELETE /records/:id
* PUT /records/restore/:id

### Dashboard

* GET /dashboard/summary

---

## API Documentation 

This repository includes API documentation through clearly defined endpoints and sample request formats.

All APIs can be tested locally using Postman or any API client by following the examples below.

---

## API Testing (Postman Collection)

A ready-to-use Postman collection is included in this repository for quick API testing.

File:
finance-backend.postman_collection.json

Steps to use:

1. Open Postman
2. Click Import
3. Select the above JSON file
4. Run the APIs directly

Note:
Generate a token using the Login API and use it for protected routes.

---

## Sample API Usage

### Register User

POST /auth/register

Request Body:
{
"email": "[admin@test.com](mailto:admin@test.com)",
"password": "123456",
"role": "ADMIN"
}

---

### Login

POST /auth/login

Request Body:
{
"email": "[admin@test.com](mailto:admin@test.com)",
"password": "123456"
}

Response:
{
"token": "<JWT_TOKEN>"
}

---

### Create Record

POST /records

Headers:
Authorization: Bearer <JWT_TOKEN>

Request Body:
{
"amount": 5000,
"type": "INCOME",
"category": "Salary",
"date": "2024-04-01",
"notes": "Monthly salary"
}

Note: Obtain the token from the login API and include it in the Authorization header.

---

## Design Decisions

* Adopted clean architecture (Controller → Service → Database) to ensure separation of concerns
* Implemented role-based access control using middleware
* Used Prisma ORM for type-safe and maintainable database queries
* Performed aggregation logic in the service layer for better flexibility and portability
* Implemented soft delete to preserve data and allow recovery

---

## Assumptions

* Roles are predefined (Viewer, Analyst, Admin)
* SQLite is used for simplicity and local development
* Authentication is JWT-based
* The system is designed for a single-tenant environment

---

## Trade-offs

* SQLite is used instead of PostgreSQL for simplicity
* No caching layer is implemented
* Automated tests are not included to keep the scope focused

---

## Future Improvements

* Add unit and integration tests
* Add API documentation using Swagger
* Introduce caching (Redis)
* Enhance analytics capabilities
* Improve logging and monitoring

---

## Deployment Note

The application is not deployed to a live server.
It is designed to run locally and can be tested using Postman.

For production deployment, the system can be hosted on platforms such as Render or Railway with a PostgreSQL database.

---

## Author

K Vishnu
Backend Developer | Final Year Engineering Student
Email: [vishnukodidala78@gmail.com](mailto:vishnukodidala78@gmail.com)

---

## Declaration

This project was developed as part of a backend engineering assessment for a Backend Developer Internship role.

External resources were used for learning purposes, but the implementation and design decisions were made independently.

--- Thank You ---