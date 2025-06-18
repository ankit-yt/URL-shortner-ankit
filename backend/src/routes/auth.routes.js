import express from 'express'
import { getCurrentUser, login, logout, register } from '../controller/auth.controller.js';
import {authMiddleware} from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/register", register )
router.post("/login", login)
router.get("/logOut",authMiddleware,logout)
router.get("/me",authMiddleware,getCurrentUser)

export default router;