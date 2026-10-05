import express from 'express';
import { getLandmarks, getLandmarkBySlug } from '../controllers/landmarks.js';

const router = express.Router();

router.get('/', getLandmarks);
router.get('/:slug', getLandmarkBySlug);

export default router;