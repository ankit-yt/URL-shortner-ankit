import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getAllUserURLsController } from '../controller/user.controller.js';
const router = express.Router()

router.get("/getUrls",authMiddleware,getAllUserURLsController)

export default router;