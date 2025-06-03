const router = require("express").Router();
import * as applicationController from "../controllers/jobApplicationContoller";
import checkJwt from '@/middleware/checkJwt';
import { verifyUserOwnership } from '@/middleware/verifyUserOwnership';
import { verifyApplicationOwnership } from '@/middleware/verifyApplicationOwnership';

// v1/api/applications

// Secure all routes with JWT and user ownership verification
router.get("/", checkJwt, verifyUserOwnership, applicationController.getActiveJobApplications);
router.post("/active", checkJwt, verifyUserOwnership, applicationController.createJobApplication);
router.get(
  "/not-active",
  checkJwt,
  verifyUserOwnership,
  applicationController.getNoLongerConsideringApplications
);
router.put("/:id", checkJwt, verifyApplicationOwnership, applicationController.updateJobApplication);

export default router;
