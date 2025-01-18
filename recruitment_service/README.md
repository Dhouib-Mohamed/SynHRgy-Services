# Recruitement Service API

This project provides an Express-based API to manage job applications. It supports creating, retrieving, and updating the status of applications for different job roles.

## Features

- **Submit a new application**
- **Retrieve applications with optional filters**
- **Update the status of an existing application**

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/Dhouib-Mohamed/SynHRgy-Services.git
cd recruitment service
npm install
```

Make sure to create a `.env` file to define environment variables like `HOST` and `PORT`.

## API Endpoints

### 1. **Create New Application**
- **URL**: `/applications`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "candidateName": "John Doe",
      "role": "Software Engineer",
      "status": "Pending",
      "offerId": "101"
    }
    ```
- **Response**:
    - `201 Created`: Application created successfully.
    - `400 Bad Request`: Missing required fields in the request body.

### 2. **Get All Applications (With Filters)**
- **URL**: `/applications`
- **Method**: `GET`
- **Query Parameters** (optional):
    - `role`: Filter applications by job role.
    - `offerId`: Filter applications by offer ID.
    - `candidateName`: Filter applications by candidate name (case-insensitive).
    - `status`: Filter applications by status (e.g., `Pending`, `Approved`, `Rejected`).

- **Response**:
    - `200 OK`: Returns the filtered list of applications.

### 3. **Update Application Status**
- **URL**: `/application/:id`
- **Method**: `PUT`
- **URL Parameters**:
    - `id`: The ID of the application to update.
- **Body**:
    ```json
    {
      "status": "Approved"
    }
    ```
- **Response**:
    - `200 OK`: Candidate status updated successfully.
    - `404 Not Found`: Application not found.

## Environment Variables

The following environment variables can be configured in a `.env` file:

- `HOST`: The host address where the server will run (default: `localhost`).
- `PORT`: The port on which the server will listen (default: `3000`).

## Running the Application

To start the server, run the following command:

```bash
npm start
```

The server will be available at `http://localhost:3000`

## Testing the API

You can test the API using any HTTP client like Postman or cURL.
