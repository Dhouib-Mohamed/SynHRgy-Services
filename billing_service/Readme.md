# Billing Service API

This is a simple **Billing Service** RESTful API built with **Express.js**. It manages payroll records for employees and calculates billing costs for client companies.

---

## 🚀 Features
- **Update Employee Data**: Modify payroll and start date for employees.
- **Generate Client Bill**: Calculate the total cost for client companies based on employee payroll and predefined rates.

---

## 📚 API Endpoints

### 1. **GET `/bill/:companyId`**

Calculate the total payroll cost and the client cost for a specific company.

#### **URL**:
```plaintext
GET http://localhost:3000/bill/:companyId
```

#### **Response**:
- **`200 OK`**: Returns billing details for the company.
- **`404 Not Found`**: If no employees are found for the company.
- **`400 Bad Request`**: If the company rate is not defined.

#### **Example Response**:
```json
{
  "companyId": "A",
  "totalPayroll": 7000,
  "rate": 1.2,
  "totalCost": 8400,
  "message": "The total cost for company A is $8400.00"
}
```

---

### 2. **POST `/employee/:id`**

Update payroll and start date for an employee.

#### **URL**:
```plaintext
POST http://localhost:3000/employee/:id
```

#### **Request Body**:
```json
{
  "payroll": 3500,
  "startDate": "2024-09-01"
}
```

#### **Response**:
- **`200 OK`**: Returns the updated employee data.
- **`400 Bad Request`**: If payroll or start date is missing.
- **`404 Not Found`**: If the employee ID is not found.

#### **Example Response**:
```json
{
  "message": "Employee updated",
  "employee": {
    "id": "1",
    "companyId": "A",
    "payroll": 3500,
    "startDate": "2024-09-01"
  }
}
```

---

## 🏆 Technologies Used
- **Node.js**: JavaScript runtime.
- **Express.js**: Framework for building RESTful APIs.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** installed.
- **npm** package manager.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/billing-service.git
   cd billing-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   PORT=3000
   ```

### Running the Service
Start the server:
```bash
npm run dev
```

---

## 🛠 Simulated Data

### Employees
```json
[
  { "id": "1", "companyId": "A", "payroll": 3000, "startDate": "2024-01-01" },
  { "id": "2", "companyId": "A", "payroll": 4000, "startDate": "2024-02-01" },
  { "id": "3", "companyId": "B", "payroll": 5000, "startDate": "2024-03-01" }
]
```

### Rates
```json
{
  "A": 1.2,
  "B": 1.3
}
```

---

## 🧪 Example Usage

### Get an Employee Info
```bash
curl http://localhost:3000/employee/1/A
```


### Update an Employee
```bash
curl -X POST http://localhost:3000/employee/1/A \
-H "Content-Type: application/json" \
-d '{"payroll": 3500, "startDate": "2024-09-01"}'
```

### Get a Client Bill
```bash
curl http://localhost:3000/bill/A
```
