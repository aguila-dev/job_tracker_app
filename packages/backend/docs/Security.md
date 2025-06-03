# Application Security Guide

This document outlines the security measures implemented in the Job Tracker application.

## Authentication

The application uses Auth0 as the primary authentication provider. Auth0 provides:

1. Secure user authentication with industry-standard protocols
2. JWT-based authentication tokens
3. User profile management

### Authentication Flow

1. Users authenticate via Auth0's hosted login page
2. Auth0 issues a JWT token that is validated by our backend
3. The token contains user claims including `sub` (subject ID) and `email`
4. The backend validates the token signature, expiration, and issuer

## Authorization

The application implements several authorization mechanisms:

1. **User Ownership Verification**: Users can only access their own data
2. **Application Ownership Verification**: Users can only modify their own job applications
3. **Role-Based Access**: User roles are stored in the database (though not fully implemented yet)

## Security Headers

We use the Helmet middleware to add important security headers:

1. Content-Security-Policy
2. X-XSS-Protection
3. X-Frame-Options
4. X-Content-Type-Options
5. Referrer-Policy

## Session Security

Sessions are secured with the following settings:

1. HTTP-only cookies
2. Secure cookies (in production)
3. SameSite=Lax attribute to prevent CSRF attacks
4. 7-day expiration for sessions

## Password Security

For the local user system (deprecated):

1. Passwords are hashed with bcrypt (12 rounds)
2. Password reset tokens are time-limited
3. Failed login attempts are not rate-limited (TODO)

## Token Handling

1. Access tokens expire after 15 minutes
2. Refresh tokens expire after 7 days
3. Tokens are stored in HTTP-only cookies
4. Session is destroyed on logout

## Data Protection

1. User data is isolated - users can only access their own data
2. API endpoints are protected with middleware that verifies user ownership
3. Error messages are sanitized to avoid information disclosure

## CORS Configuration

1. CORS is configured with a whitelist of allowed origins
2. Credentials are enabled for cross-origin requests

## Adding New Routes

When adding new routes that access user data, follow these guidelines:

1. Protect the route with the `checkJwt` middleware
2. Use the `verifyUserOwnership` or `verifyApplicationOwnership` middleware
3. Sanitize error messages
4. Log errors server-side but don't expose details to clients

## Environment Variables

Sensitive configuration is stored in environment variables:

1. Database credentials
2. Auth0 configuration
3. JWT secrets
4. Encryption keys

Never commit `.env` files to version control. Use `.env.example` as a template.

## Future Security Improvements

1. Implement rate limiting for authentication endpoints
2. Add API request throttling
3. Implement audit logging for security events
4. Improve error handling and logging
5. Implement refresh token rotation
6. Add token revocation on password change
7. Complete removal of the deprecated authentication system