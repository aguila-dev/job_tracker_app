# Job Tracker Monorepo

This monorepo contains both the frontend and backend applications for the Job Tracker project.

## Project Structure

```
/
├── packages/              # All application packages
│   ├── backend/           # Express backend application
│   │   └── ...
│   └── frontend/          # React frontend application
│       └── ...
├── shared/                # Shared code, types and utilities
│   └── ...
├── docker-compose.yml     # Development docker-compose configuration
└── package.json           # Root package.json with workspaces
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher with workspaces support)
- Docker and Docker Compose (for containerized development)

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the shared package:
   ```
   cd shared && npm run build
   ```
4. Create a `.env` file based on `.env.example`

### Development

#### Running with npm

Start both applications in development mode:
```
npm run dev
```

Or start them individually:
```
npm run dev:frontend
npm run dev:backend
```

#### Running with Docker

Start the entire stack with Docker Compose:
```
docker-compose up
```

### Building for Production

Build all packages:
```
npm run build
```

## Migrating from Previous Structure

If you're migrating from the previous separate repository structure, run:

```
./migrate-to-monorepo.sh
```

This script will:
1. Copy all files from the backend and frontend directories into the new monorepo structure
2. Update package.json files to work with the monorepo
3. Update tsconfig.json files to reference shared types
4. Update Dockerfiles to work in the monorepo context

### Known Issues and Solutions

1. **Node.js Version Compatibility**: Some packages may have issues with Node.js v23. Consider using Node.js v18 or v20 LTS.

2. **Environment Variables**: Make sure to set up proper .env files in each package directory:
   - Create a packages/backend/.env file with database configuration
   - Create a packages/frontend/.env file with backend URL

3. **Missing Modules**: If you encounter "Cannot find module" errors:
   - Try reinstalling the specific package
   - Use npx to run commands (e.g., `npx ts-node` instead of `ts-node`)

4. **Database Connection**: Ensure your PostgreSQL server is running and accessible with the credentials in your .env file

## Shared Code

Shared types and utilities are in the `shared` package. This is where you should put any code that needs to be used by both frontend and backend applications.

## Testing

Run tests for all packages:
```
npm test
```

Or test them individually:
```
npm run test:frontend
npm run test:backend
```