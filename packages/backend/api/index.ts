import checkJwt from '@/middleware/checkJwt';
import express, { Request, Response } from 'express';
import { publicKey } from 'script/genKey';
import adminRoutes from './adminRoutes';
import applicationsRoute from './applicationsRoute';
import companiesRoute from './companiesRoute';
import jobsRoute from './jobsRoute';
const router = express.Router();

router.use(checkJwt);

// v1/api
router.use('/jobs', jobsRoute);
router.use('/applications', applicationsRoute);
router.use('/companies', companiesRoute);

// admin
router.use('/admin', adminRoutes);

export default router;
