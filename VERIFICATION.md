# Migration Verification Guide

After running the migration script, follow these steps to verify that the monorepo structure works correctly.

## 1. Verify Directory Structure

Ensure that the directory structure matches:

```
/
├── packages/
│   ├── backend/
│   │   └── [all backend files]
│   └── frontend/
│       └── [all frontend files]
├── shared/
│   ├── src/
│   │   ├── types/
│   │   └── index.ts
│   └── package.json
├── docker-compose.yml
├── package.json
└── tsconfig.base.json
```

## 2. Install Dependencies

```bash
npm install
```

Verify that dependencies are correctly installed in both packages.

## 3. Build Shared Package

```bash
cd shared && npm run build
cd ..
```

Verify that the shared package builds successfully and the types are generated.

## 4. Start Backend in Development Mode

```bash
cd packages/backend
npm run dev
```

Verify that:
- The server starts without errors
- Database connections work
- API endpoints function correctly

## 5. Start Frontend in Development Mode

```bash
cd packages/frontend
npm run dev
```

Verify that:
- The application builds and runs
- The UI renders correctly
- API calls to the backend work

## 6. Run Both with Docker Compose

```bash
docker-compose up
```

Verify that:
- Both services start correctly
- Services can communicate with each other
- The database connects properly

## 7. Run Tests

```bash
npm test
```

Verify that all tests pass in both packages.

## 8. Troubleshooting Common Issues

### Module Resolution Problems

If you encounter module resolution issues:
- Check the `paths` configuration in tsconfig.json files
- Ensure imports are using the correct path aliases
- Verify the shared package is built before running the applications

### Docker Network Issues

If frontend can't connect to backend in Docker:
- Check the network configuration in docker-compose.yml
- Verify environment variables are correctly set
- Ensure services are on the same network

### Database Connection Issues

If database connections fail:
- Check the database URL and credentials
- Verify the database service is running
- Check for any missing environment variables