# Use Python base image
FROM python:3.8

# Set working directory
WORKDIR /app

# Copy files
COPY main.py ./
COPY .env ./
COPY requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt

# Expose application port
EXPOSE 8082

# Run the application
CMD ["python", "main.py"]
