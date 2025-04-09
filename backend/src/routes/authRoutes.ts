import { Router } from 'express'
import { getAuthUrl, authCallback } from '../controllers/authController';

const router = Router();

router.get('/auth_url', getAuthUrl);
router.get('/auth_callback', authCallback);

export default router;