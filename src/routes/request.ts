import { Router } from 'express';
import {
  getRequests,
  addRequest,
  deleteRequest,
  getRequest
} from '../controllers/requestController';

const router = Router();

router.get('/', getRequests);
router.get('/:requestId', getRequest);
router.post('/', addRequest);
router.delete('/:id', deleteRequest);

export default router;
