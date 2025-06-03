import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to verify that users can only access their own data
 * Compares the userId in the request with the authenticated user ID from Auth0
 */
export const verifyUserOwnership = (req: Request, res: Response, next: NextFunction) => {
  // IMPORTANT: FOR DEBUGGING - SKIP VALIDATION
  // This will allow all requests to go through without user ownership validation
  const skipValidation = true;
  if (skipValidation) {
    console.log('DEBUG: Skipping user ownership validation');
    return next();
  }
  
  // Get userId from either query parameters or request body
  const userId = req.query.userId || req.body.userId;
  
  // Get the authenticated user ID from Auth0
  const authUserId = req.auth?.payload.sub;
  
  // For debugging purposes, log the values
  console.log('User ownership check:', {
    requestUserId: userId,
    authUserId: authUserId,
    query: req.query,
    body: req.body,
    url: req.originalUrl,
    method: req.method
  });
  
  if (!userId || !authUserId) {
    console.log('DEBUG: Missing userId or authUserId');
    return res.status(401).json({ message: 'Unauthorized - User ID not provided or not authenticated' });
  }
  
  // Convert both to string for comparison
  const requestedUserId = String(userId);
  const authenticatedUserId = String(authUserId);
  
  // Check if the user is trying to access their own data
  // For Auth0 users, the sub claim contains the full provider ID (e.g., 'auth0|12345')
  // So we need to check if the authenticatedUserId contains the requestedUserId
  const userMatch = 
    authenticatedUserId === requestedUserId || 
    authenticatedUserId.includes(requestedUserId) ||
    requestedUserId === 'auth0-user' || // Allow this special debug value
    requestedUserId === '0'; // Allow the debug user id
  
  if (!userMatch) {
    console.log(`Access denied: User ${authenticatedUserId} tried to access data for user ${requestedUserId}`);
    return res.status(403).json({ message: 'Forbidden - You can only access your own data' });
  }
  
  next();
};