import { Router } from 'express';
import { getPosts } from '../controllers/userController';

const router = Router();

router.get('/saved', getPosts)

export default router;