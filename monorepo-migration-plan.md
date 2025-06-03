# Monorepo Migration Plan

## Current Structure Analysis

### Backend
- Node.js/Express using TypeScript with CommonJS modules
- Uses Sequelize ORM with PostgreSQL 
- Development with nodemon and ts-node
- Path aliases (@/* for module imports)
- Uses port 8000 in Docker

### Frontend
- React with Vite using TypeScript with ESM modules
- Uses React Router, Redux, Auth0
- TailwindCSS for styling
- Strict linting with ESLint, Prettier
- Uses port 5173 in Docker

## Migration Steps

### 1. Create Monorepo Root Structure

```
/
├── package.json        # Root package.json with workspaces
├── .gitignore          # Combined gitignore
├── docker-compose.yml  # Combined docker-compose
├── packages/
│   ├── backend/        # Move existing backend code here
│   │   └── ...
│   └── frontend/       # Move existing frontend code here
│       └── ...
└── shared/             # Shared code/types/utilities
    └── ...
```

### 2. Root Package.json Configuration

Create a root `package.json` with:
- Workspace configuration
- Common dev dependencies
- Scripts to run both apps
- Common linting/formatting rules

### 3. Docker Configuration

Create a unified docker-compose.yml that:
- Includes both services
- Sets up the database
- Configures the network between services
- Maps the correct ports

### 4. TypeScript Configuration

Create a base tsconfig with common settings, then extend in each project:
- Handle the module system differences
- Maintain existing path aliases
- Set up proper build outputs

### 5. Shared Code (if needed)

Create a shared package for:
- Common types
- Shared utilities
- API interfaces

### 6. Environment Variables

Standardize environment variables:
- Create .env files for different environments
- Document required variables

### 7. Scripts and Workflows

Add convenience scripts:
- Start both services
- Build everything
- Run tests across packages
- Linting

## Implementation Plan

1. First create the monorepo structure without changing functionality
2. Verify each app still works independently
3. Set up shared types/interfaces
4. Improve build/deployment process

## Potential Challenges

1. Different module systems (CommonJS vs ESM)
2. Path alias compatibility
3. Dependency conflicts
4. Docker networking
5. Development workflow changes

## Next Steps

1. Create the initial monorepo structure
2. Test each application independently
3. Set up shared configuration
4. Implement unified build/test scripts