# Job Offer Management Service

## Overview
This Node.js application provides an API for managing job offers. It allows creating, retrieving, and updating job offers for different companies. 
The service supports features like filtering offers by status and updating their statuses based on predefined conditions.

---

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- A `.env` file containing the following variables:
  - `HOST`: The hostname for the server (default: `localhost`)
  - `PORT`: The port number for the server (default: `3000`)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dhouib-Mohamed/SynHRgy-Services.git
   ```

2. Navigate to the project directory:
   ```bash
   cd client_realtions_service
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file and set the required environment variables.

5. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### 1. Add a New Offer
**Endpoint**: `POST /add_offer/:company_id`

**Description**: Adds a new job offer with a status of `pending` for the specified company.

**Request Body**:
```json
{
  "companyName": "TechCorp Inc.",
  "role": "Software Engineer",
  "degree": "Bachelor's in Computer Science",
  "experience": "2+ years",
  "workLocation": "Remote",
  "workMethod": "Full-Time",
  "description": "Develop and maintain cutting-edge software solutions in a collaborative team environment.",
  "startDate": "2024-01-15"
}
```

**Response**:
- `201 Created`: Offer added successfully.

---

### 2. Retrieve Offers by Company ID
**Endpoint**: `GET /get_offer/:company_id`

**Description**: Retrieves all offers for the specified company. Optionally filters by status.

**Query Parameters**:
- `status` (optional): Filters offers by their status (e.g., `pending`, `searching`, `declined`).

**Response**:
- `200 OK`: Offers retrieved successfully.
- `404 Not Found`: No offers found for the specified criteria.

---

### 3. Update Offer Status
**Endpoint**: `PUT /change_offer_status/:company_id`

**Description**: Updates the status of an offer based on its current state.

**Request Body**:
```json
{
  "status": "searching" // or "declined"
}
```

**Conditions**:
- If `status` is `searching`, the offer's current status must be `pending`.
- If `status` is `declined`, the offer's current status must be `pending`.

**Response**:
- `200 OK`: Offer status updated successfully.
- `400 Bad Request`: Invalid status or transition not allowed.
- `404 Not Found`: Offer not found for the specified company.

