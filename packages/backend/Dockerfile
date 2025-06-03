# Use an official Node.js image as a base
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy root package.json and package-lock.json
COPY ../../package*.json ./

# Copy workspace package.json files
COPY ../../packages/backend/package*.json ./packages/backend/
COPY ../../shared/package*.json ./shared/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ../../packages/backend ./packages/backend
COPY ../../shared ./shared

# Set working directory to the backend package
WORKDIR /app/packages/backend

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["npm", "run", "dev"]
