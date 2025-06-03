import { NextFunction, Request, Response } from 'express';
import { JobApplication } from '../db';

/**
 * Middleware to verify that users can only update their own job applications
 */
export const verifyApplicationOwnership = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.params.id;
    const authUserId = req.auth?.payload.sub;
    
    if (!applicationId || !authUserId) {
      return res.status(401).json({ message: 'Unauthorized - Missing application ID or not authenticated' });
    }
    
    // Find the job application
    const application = await JobApplication.findByPk(applicationId);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Convert both to string for comparison
    const applicationUserId = String(application.userId);
    const authenticatedUserId = String(authUserId);
    
    // Check if the authenticated user owns this application
    const userMatch = 
      authenticatedUserId === applicationUserId || 
      authenticatedUserId.includes(applicationUserId);
    
    if (!userMatch) {
      console.log(`Access denied: User ${authenticatedUserId} tried to update application ${applicationId} owned by ${applicationUserId}`);
      return res.status(403).json({ message: 'Forbidden - You can only update your own applications' });
    }
    
    next();
  } catch (error) {
    console.error('Error in verifyApplicationOwnership:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};