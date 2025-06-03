#!/bin/bash
set -e

# Define the root directory
ROOT_DIR="/Users/aguilana/Coding/app_job_tracker"

# Function to print status messages
print_status() {
  echo "==============================================="
  echo "✅ $1"
  echo "==============================================="
}

# Copy backend files to packages/backend
print_status "Copying backend files to packages/backend"
cp -r "$ROOT_DIR/backend/"* "$ROOT_DIR/packages/backend/"

# Copy frontend files to packages/frontend
print_status "Copying frontend files to packages/frontend"
cp -r "$ROOT_DIR/frontend/"* "$ROOT_DIR/packages/frontend/"

# Update backend package.json
print_status "Updating backend package.json"
cat > "$ROOT_DIR/packages/backend/package.json" << EOF
{
  "name": "@job-tracker/backend",
  "version": "1.0.0",
  "description": "backend for jobs app",
  "main": "index.js",
  "scripts": {
    "dev": "NODE_ENV=development IGNORE_UPDATE_ON_RESTART=true nodemon --ignore 'locations.json' --exec ts-node -r tsconfig-paths/register index.ts",
    "dev:seed": "DROP_DB=true SEED_DB=true NODE_ENV=development IGNORE_UPDATE_ON_RESTART=false nodemon --ignore 'locations.json' --exec ts-node -r tsconfig-paths/register index.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/index.js",
    "test": "jest",
    "update-db": "ts-node -r tsconfig-paths/register script/update-db.ts",
    "gen-key": "ts-node -r tsconfig-paths/register script/genKey.ts",
    "delete-users": "ts-node -r tsconfig-paths/register script/sql/deleteUsers.ts",
    "seed-users": "ts-node script/sql/seedUsers.ts",
    "reseedUsers": "ts-node -r tsconfig-paths/register script/sql/deleteAndReseed.ts"
  },
  "dependencies": {
    "@job-tracker/shared": "1.0.0",
    "axios": "^1.6.8",
    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "express-oauth2-jwt-bearer": "^1.6.0",
    "express-session": "^1.18.0",
    "jsonwebtoken": "^9.0.2",
    "morgan": "^1.10.0",
    "node-cron": "^3.0.3",
    "node-fetch": "^3.3.2",
    "nodemon": "^3.1.0",
    "pg": "^8.11.5",
    "puppeteer": "^22.6.4",
    "redis": "^4.6.14",
    "sequelize": "^6.37.3",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/bcryptjs": "^2.4.6",
    "@types/cookie-parser": "^1.4.7",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/express-session": "^1.18.0",
    "@types/jest": "^29.5.12",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/morgan": "^1.9.9",
    "@types/node": "^20.12.7",
    "@types/node-cron": "^3.0.11",
    "jest": "^29.7.0",
    "prettier": "^3.3.3",
    "sequelize-cli": "^6.6.2",
    "ts-jest": "^29.2.2",
    "tsconfig-paths": "^4.2.0",
    "tsconfig-paths-jest": "^0.0.1"
  }
}
EOF

# Update frontend package.json
print_status "Updating frontend package.json"
cat > "$ROOT_DIR/packages/frontend/package.json" << EOF
{
  "name": "@job-tracker/frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "Application to track job applications",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint './src/**/*.{js,jsx,ts,tsx}' && tsc --noEmit",
    "lint:fix": "eslint './src/**/*.{js,jsx,ts,tsx}' --fix && tsc --noEmit",
    "prepare": "cd ../.. && husky",
    "preview": "vite preview",
    "test": "jest"
  },
  "dependencies": {
    "@job-tracker/shared": "1.0.0",
    "@auth0/auth0-react": "^2.2.4",
    "@reduxjs/toolkit": "^2.2.5",
    "@tailwindcss/typography": "^0.5.13",
    "@tanstack/react-query": "^5.59.16",
    "axios": "^1.6.8",
    "classnames": "^2.5.1",
    "date-fns": "^3.6.0",
    "date-fns-tz": "^3.1.3",
    "he": "^1.2.0",
    "js-cookie": "^3.0.5",
    "jsonwebtoken": "^9.0.2",
    "jwt-decode": "^4.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.1.2",
    "react-router-dom": "^6.22.3"
  },
  "devDependencies": {
    "@types/he": "^1.2.3",
    "@types/jest": "^29.5.12",
    "@types/js-cookie": "^3.0.6",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@typescript-eslint/parser": "^7.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-import-resolver-alias": "^1.1.2",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "jest": "^29.7.0",
    "postcss": "^8.4.38",
    "prettier": "^3.3.3",
    "prettier-plugin-tailwindcss": "^0.6.6",
    "tailwindcss": "^3.4.3",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.2.2",
    "vite": "^5.2.0"
  }
}
EOF

# Update backend tsconfig.json
print_status "Updating backend tsconfig.json"
cat > "$ROOT_DIR/packages/backend/tsconfig.json" << EOF
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./",
    "moduleResolution": "node",
    "outDir": "./dist",
    "noImplicitAny": true,
    "typeRoots": [
      "./node_modules/@types",
      "./interface",
      "./types"
    ],
    "baseUrl": "./",
    "paths": {
      "@/*": ["./*"],
      "@utils/*": ["utils/*.ts"],
      "@interfaces/*": ["interface/*.ts"],
      "@services/*": ["services/*.ts"],
      "@types/*": ["types/*.ts"],
      "@shared/*": ["../../shared/src/*"]
    }
  },
  "include": [
    "./**/*.ts",
    "types/**/*.d.ts",
    ".env.ts",
    "environment.d.ts",
    "types/**/*"
  ],
  "exclude": ["node_modules", "dist"]
}
EOF

# Update frontend tsconfig.json
print_status "Updating frontend tsconfig.json"
cat > "$ROOT_DIR/packages/frontend/tsconfig.json" << EOF
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../../shared/src/*"]
    }
  },
  "ts-node": {
    "esm": true
  },
  "include": ["src", "src/types", "src/**/*.ts", "src/**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# Update frontend Dockerfile
print_status "Updating frontend Dockerfile"
cat > "$ROOT_DIR/packages/frontend/Dockerfile" << EOF
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
EOF

# Update backend Dockerfile
print_status "Updating backend Dockerfile"
cat > "$ROOT_DIR/packages/backend/Dockerfile" << EOF
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
EOF

# Create .env.example file
print_status "Creating .env.example file"
cat > "$ROOT_DIR/.env.example" << EOF
# Database Configuration
LOCAL_PG_DB_USER=postgres
LOCAL_PG_DB_PASSWORD=postgres
LOCAL_PG_DB_NAME_TEST=jobsdb

# Backend Configuration
PORT=8000
NODE_ENV=development

# Frontend Configuration
VITE_BACKEND_URL=http://localhost:8000
EOF

print_status "Migration script completed successfully!"
print_status "Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Build shared package: cd shared && npm run build"
echo "3. Start the monorepo: npm run dev"