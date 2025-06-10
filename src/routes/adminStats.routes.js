import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middlewares.js';
import adminStats from '../controllers/adminstats/adminStats.controller.js';

const router = Router()


router.get("/stats", authenticateUser, adminStats)


export default router;