import { Router } from 'express';
import { getProfile } from '../controllers/userController';

const router = Router();

router.get('/me', getProfile);

export default router;