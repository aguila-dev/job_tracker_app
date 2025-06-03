# Use an official Node.js image as a base
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy root package.json and package-lock.json
COPY ../../package*.json ./

# Copy workspace package.json files
COPY ../../packages/frontend/package*.json ./packages/frontend/
COPY ../../shared/package*.json ./shared/

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ../../packages/frontend ./packages/frontend
COPY ../../shared ./shared

# Set working directory to the frontend package
WORKDIR /app/packages/frontend

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
