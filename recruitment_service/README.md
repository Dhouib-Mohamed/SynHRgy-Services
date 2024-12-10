# Recruitment Service API

This is a simple **Recruitment Service (Back Office)** RESTful API built with **Express.js**. It allows you to list job applications and update their statuses, simulating integration with a Document Processing system via logs.

---

## 🚀 Features
- **GET `/applications`**: List all job applications (filter by role with query parameter `role`).
- **POST `/application/:id`**: Accept/Reject a candidate's application by updating its status.

---

## 📚 API Endpoints

### 1. **GET `/applications`**

Fetch all applications or filter by role.

#### **URL**:
```plaintext
GET http://localhost:3000/applications
```

#### **Optional Query Parameters:**
- `role`: Filter by job role.

#### Example Request:
```http
GET /applications?role=Software%20Engineer
```

#### Example Response:
```json
[
  {
    "id": "1",
    "candidateName": "John Doe",
    "role": "Software Engineer",
    "status": "Pending"
  }
]
```

---

### 2. **POST `/application/:id`**

Update an application’s status.

#### **URL**:
```plaintext
POST http://localhost:3000/application/:id
```

#### **Request Body**:
```json
{
  "status": "done"
}
```

#### Example Response:
```json
{
  "message": "Application updated",
  "applicationId": "2",
  "newStatus": "done"
}
```

---

## 🏆 Technologies
- **Express.js**: Framework for building APIs
