package main

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

type Candidate struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Status string `json:"status"`
}

var candidates = map[string]Candidate{
	"1": {ID: "1", Name: "John Doe", Status: "Pending"},
	"2": {ID: "2", Name: "Jane Smith", Status: "Pending"},
}

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found. Falling back to system environment variables.")
	}

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080" // Default port
	}

	router := mux.NewRouter()
	router.HandleFunc("/generate_and_send_candidate_docs/{candidate_id}", GenerateAndSendCandidateDocs).Methods("POST")
	router.HandleFunc("/receive_candidate_answer/{candidate_id}", ReceiveCandidateAnswer).Methods("POST")

	log.Printf("Server starting on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}

func GenerateAndSendCandidateDocs(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	candidateID := vars["candidate_id"]

	candidate, exists := candidates[candidateID]
	if !exists {
		http.Error(w, "Candidate not found", http.StatusNotFound)
		return
	}

	candidate.Status = "Docs Sent"
	candidates[candidateID] = candidate

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Documents generated and sent",
		"status":  candidate.Status,
	})
}

func ReceiveCandidateAnswer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	candidateID := vars["candidate_id"]

	candidate, exists := candidates[candidateID]
	if !exists {
		http.Error(w, "Candidate not found", http.StatusNotFound)
		return
	}

	candidate.Status = "Accepted"
	candidates[candidateID] = candidate

	message := map[string]string{
		"message": "Candidate accepted. Notification sent to training and finance services",
		"status":  candidate.Status,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(message)
}
