require('dotenv').config();
import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { API } from './constants';
import { corsAllowList } from 'config/allowList';

const app: Express = express();
const router = express.Router();

import apiRoutes from './api';
import authRoutes from './auth';
import path from 'path';
import { errorHandling } from 'middleware/errorHandling';

/**
 * Cors Configuration
 */
const allowList = corsAllowList();
app.use(cors({ origin: allowList, credentials: true }));

/**
 * Middleware
 */
// Add security headers
app.use(helmet());

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax', // Adds CSRF protection
    },
  })
);

/**
 * Static Files
 */
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(router);

/**
 * API Routing Health Check
 * */
router.get('/v1/api/health', (req: Request, res: Response) => {
  res.sendStatus(200);
});

/**
 * API Routing
 * */
app.use(`/v1/api`, apiRoutes);

/**
 * Auth Routing Health Check
 * */
router.get('/v1/auth/health', (req: Request, res: Response) => {
  res.sendStatus(200);
});

/**
 * Auth Routing
 * */
app.use(`/v1/auth`, authRoutes);

/* Error handling */
app.use(errorHandling);

export default app;
