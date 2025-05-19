import { Router } from 'express';
import { getProfile, getPosts } from '../controllers/userController';

const router = Router();

router.get('/me', getProfile);
router.get('/saved', getPosts)

export default router;