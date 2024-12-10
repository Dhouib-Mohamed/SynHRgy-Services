# Candidate Document Processing API

This is a **Candidate Document Processing API** built in **Go**, using the **Gorilla Mux** router. It simulates the generation of candidate documents and processing their responses for integration with training and finance services.

---

## 🚀 Features
- **Generate and Send Documents**: Updates the candidate status to "Docs Sent".
- **Receive Candidate Response**: Updates the candidate status to "Accepted" and simulates notifying the training and finance services.

---

## 📚 API Endpoints

### 1. **POST `/generate_and_send_candidate_docs/{candidate_id}`**

Generates and sends documents to the candidate.

#### **URL**:
```plaintext
POST http://localhost:8080/generate_and_send_candidate_docs/{candidate_id}
```

#### **Path Parameter**:
- `candidate_id`: The ID of the candidate.

#### **Example Response**:
```json
{
  "message": "Documents generated and sent",
  "status": "Docs Sent"
}
```

#### **Response Codes**:
- **`200 OK`**: Documents generated and sent successfully.
- **`404 Not Found`**: Candidate not found.

---

### 2. **POST `/receive_candidate_answer/{candidate_id}`**

Processes the candidate's response and updates their status.

#### **URL**:
```plaintext
POST http://localhost:8080/receive_candidate_answer/{candidate_id}
```

#### **Path Parameter**:
- `candidate_id`: The ID of the candidate.

#### **Example Response**:
```json
{
  "message": "Candidate accepted. Notification sent to training and finance services",
  "status": "Accepted"
}
```

#### **Response Codes**:
- **`200 OK`**: Candidate's response processed successfully.
- **`404 Not Found`**: Candidate not found.

---

## 🏆 Technologies Used
- **Go**: Programming language.
- **Gorilla Mux**: HTTP router for handling requests.
- **godotenv**: For managing environment variables.

---

## 🚀 Getting Started

### Prerequisites
- **Go** installed (version 1.18 or later).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/document-processing-api.git
   cd document-processing-api
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Create a `.env` file with the following content:
   ```plaintext
   SERVER_PORT=8080
   ```

---

## 🛠 Running the Service

1. Start the server:
   ```bash
   go run main.go
   ```

2. Server will start on the specified port (default: `8080`).

---

## 🧪 Example Usage

### Generate and Send Candidate Documents
```bash
curl -X POST http://localhost:8080/generate_and_send_candidate_docs/1
```

### Receive Candidate Answer
```bash
curl -X POST http://localhost:8080/receive_candidate_answer/1
```

---

## 🧩 Simulated Data

### Candidates
```json
{
  "1": { "id": "1", "name": "John Doe", "status": "Pending" },
  "2": { "id": "2", "name": "Jane Smith", "status": "Pending" }
}
```
