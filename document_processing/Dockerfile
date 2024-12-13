# Use a Node.js image as the base
FROM golang:1.23

# Set the working directory
WORKDIR /app

# Copy go.mod and go.sum
COPY go.* ./

# Install dependencies
RUN go mod download

# Copy the rest of the application files
COPY . .

# Build the Go code
RUN go build -o /app/document_processing

# Start the application
CMD ["/app/document_processing"]


