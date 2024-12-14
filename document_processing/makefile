# Load variables from .env file
ifneq (,$(wildcard .env))
    include .env
    export
endif

# Variables
APP_NAME := document-processing-service
GO := go
SERVER_PORT := $(SERVER_PORT)

# Default target
.PHONY: all
all: build

# Build the application
.PHONY: build
build:
	$(GO) build -o $(APP_NAME)

# Run the application
.PHONY: run
run: build
	@echo "Starting server..."
	PORT=$(SERVER_PORT) ./$(APP_NAME)

# Run the application in development mode
.PHONY: dev
dev:
	@echo "Running in development mode..."
	PORT=$(SERVER_PORT) $(GO) run main.go

# Format the code
.PHONY: fmt
fmt:
	$(GO) fmt ./...

# Lint the code
.PHONY: lint
lint:
	golangci-lint run

# Clean the build artifacts
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	rm -f $(APP_NAME)

# Test the /generate_and_send_candidate_docs/{candidate_id} route
.PHONY: test-generate-docs
test-generate-docs:
	curl -X POST http://localhost:$(SERVER_PORT)/generate_and_send_candidate_docs/1 -H "Content-Type: application/json" -v

# Test the /receive_candidate_answer/{candidate_id} route
.PHONY: test-receive-answer
test-receive-answer:
	curl -X POST http://localhost:$(SERVER_PORT)/receive_candidate_answer/1 -H "Content-Type: application/json" -v

# Test the /validate_offer/{offer_request_id} route
.PHONY: test-validate-offer
test-validate-offer:
	curl -X POST http://localhost:$(SERVER_PORT)/validate_offer/offer123 -H "Content-Type: application/json" -v
