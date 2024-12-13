# Use a Node.js image as the base
FROM node:18

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Start the application
CMD ["npm", "start"]
