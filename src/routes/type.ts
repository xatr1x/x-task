import { Router } from 'express';
import {
  getTypes,
  addType,
  uploadMiddleware,
  changeType,
  deleteType,
} from '../controllers/typeController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getTypes);
router.post('/', addType);
router.patch('/', changeType);
router.delete('/:id', deleteType);

export default router;
