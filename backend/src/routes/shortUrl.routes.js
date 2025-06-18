import express from "express"
const router = express.Router()
import {createCustomUrl, CreateShortUrl, deleteUrl, redirectToOriginalUrl} from "../controller/shortUrl.controller.js"
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth.middleware.js"

router.post("/create" ,optionalAuthMiddleware, CreateShortUrl)
router.get('/:shortUrl',redirectToOriginalUrl)
router.post("/create/customUrl",authMiddleware, createCustomUrl)
router.post("/deleteUrl", authMiddleware,deleteUrl)

export default router