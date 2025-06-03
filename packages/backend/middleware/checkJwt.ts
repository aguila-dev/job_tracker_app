// src/middleware/checkJwt.ts
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

dotenv.config();

const checkJwt = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`, // Your Auth0 Domain
  audience: process.env.AUTH0_AUDIENCE, // Your API Identifier
  secret: process.env.AUTH0_CLIENT_SECRET, // Your Auth0 Client Secret
  tokenSigningAlg: 'HS256',
});

export default checkJwt as RequestHandler;
