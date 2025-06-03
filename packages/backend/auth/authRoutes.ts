const router = require('express').Router();
import checkJwt from '@/middleware/checkJwt';
import { authenticate } from 'middleware/authMiddleware';
import * as authController from '../controllers/authController';

////////////////////////////
//// * Current routes * ////
////////////////////////////
router.post('/login', authController.loginAuth0User);
router.post('/signup', authController.signupAuth0User);
router.post('/logout', checkJwt, authController.logoutAuth0User);
router.get('/checkUser', checkJwt, authController.checkUser);

///////////////////////////
//// Deprecated routes ////
///////////////////////////
// router.post('/signup-2', authController.register);
// router.post('/login-2', authController.login);
// router.post('/logout-2', authController.logout);
// router.get('/refresh-token', authController.refreshToken);
// router.get('/verify-email/:token', authController.verifyEmail);
// router.get('/me', authenticate, authController.me);

export default router;
