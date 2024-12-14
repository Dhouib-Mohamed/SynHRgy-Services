# Use a Node.js image as the base
FROM python:3.8

# Install dependencies
COPY requirements.txt .

# Copy files
COPY main.py ./
COPY .env ./
COPY requirements.txt ./

RUN pip install -r requirements.txt

# Copy the rest of the application files
COPY . .

# Start the application
CMD ["python", "main.py"]
