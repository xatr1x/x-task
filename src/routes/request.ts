import { Router } from 'express';
import {
  getRequests,
  addRequest,
  deleteRequest,
} from '../controllers/requestController';

const router = Router();

router.get('/', getRequests);
router.post('/', addRequest);
router.delete('/:id', deleteRequest);

export default router;
