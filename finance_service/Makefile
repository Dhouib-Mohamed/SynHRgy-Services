# Variables
APP_NAME := FinanceService
DOCKER_IMAGE := finance_service
PORT := 8082

# Install dependencies
.PHONY: install
install:
	pip install -r requirements.txt

# Run the application locally
.PHONY: run
run:
	@echo "Starting $(APP_NAME) on port $(PORT)..."
	# TODO rename python3 to python for windows/ubuntu users 
	APP_PORT=$(PORT) python3 main.py

# Build the Docker image
.PHONY: docker-build
docker-build:
	docker build -t $(DOCKER_IMAGE) .

# Run the Docker container
.PHONY: docker-run
docker-run:
	docker run -it --rm -p $(PORT):$(PORT) --env-file .env $(DOCKER_IMAGE)

# Test /generate_invoice route
.PHONY: test-generate-invoice
test-generate-invoice:
	curl -X POST -H "Content-Type: text/xml" -d @generate_invoice_request.xml http://localhost:8082

# Test /validate_invoice route
.PHONY: test-validate-invoice
test-validate-invoice:
	curl -X POST -H "Content-Type: text/xml" -d @validate_invoice_request.xml http://localhost:8082
