import CustomError from '@/utils/customError';
import { getPaginationOptions, getPagingData } from '@utils/pagination';
import { NextFunction, Request, Response } from 'express';
import { Company, Job, JobApplication } from '../db';

//. GET /v1/api/applications
export const getActiveJobApplications = async (req: Request, res: Response) => {
  const { userId } = req.query;
  console.log('userId', userId);
  try {
    const { page, pageSize, offset, limit } = getPaginationOptions(req);

    const { count, rows: applications } = await JobApplication.findAndCountAll({
      where: { userId, noLongerConsidering: false },
      include: [
        {
          model: Job,
          include: [
            {
              model: Company,
              attributes: ['name'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    const data = getPagingData(count, applications, page, pageSize);
    console.log('fetching active applications', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching active applications:', error);
    res.status(500).json({ message: 'Failed to fetch active applications' });
  }
};

// GET applications no longer being considered
// GET /v1/api/applications/no-longer-considering
export const getNoLongerConsideringApplications = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.query;
  try {
    const { page, pageSize, offset, limit } = getPaginationOptions(req);

    const { count, rows: applications } = await JobApplication.findAndCountAll({
      where: { userId, noLongerConsidering: true },
      include: [Job],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    const data = getPagingData(count, applications, page, pageSize);
    res.json(data);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

// POST /v1/api/applications
export const createJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, jobId, job } = req.body;
  console.log('==== CREATE JOB APPLICATION ====');
  console.log('userId:', userId);
  console.log('jobId:', jobId);
  console.log('job data:', job);
  console.log('Auth object:', req.auth?.payload);
  
  // Safety check for required fields
  if (!userId || !jobId) {
    console.error('Missing required fields for job application');
    return res.status(400).json({ 
      message: 'Missing required fields: userId and jobId are required',
      provided: { userId, jobId }
    });
  }
  
  try {
    // Check if the application already exists
    const existingApplication = await JobApplication.findOne({
      where: { userId, jobId },
    });

    if (existingApplication) {
      console.log('User has already applied for this job:', {
        userId,
        jobId,
        applicationId: existingApplication.id,
        appliedAt: existingApplication.createdAt
      });
      
      // Return 200 instead of error for better UX
      return res.status(200).json({
        message: 'You have already applied for this job',
        application: existingApplication,
        alreadyExists: true
      });
    }
    
    // Create the application
    console.log('Creating new job application for user:', userId);
    const application = await JobApplication.create({ 
      userId, 
      jobId,
      // Include additional fields from the job data if available
      ...(job && {
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        url: job.url
      })
    });
    
    console.log('Successfully created application:', application.id);
    res.status(201).json(application);
  } catch (err) {
    console.error('Error creating job application:', err);
    
    // Better error handling with more details
    if (err instanceof CustomError) {
      return res.status(err.status || 400).json({ 
        message: err.message,
        error: 'custom_error' 
      });
    }
    
    // Database errors or other issues
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ 
      message: 'Failed to create job application', 
      error: errorMessage,
      details: err instanceof Error ? err.stack : undefined
    });
  }
};

// EDIT job application to make it no longer being considered
// PUT /v1/api/applications/:id
export const updateJobApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const application = await JobApplication.findByPk(id);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    application.noLongerConsidering = true;
    await application.save();
    res.json(application);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Failed to update application' });
  }
};
