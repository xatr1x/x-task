import { Router } from 'express';
import {
  getModels,
  addModel,
  changeModel,
  deleteModel,
} from '../controllers/modelController';

const router = Router();

router.get('/', getModels);
router.post('/', addModel);
router.patch('/', changeModel);
router.delete('/:id', deleteModel);

export default router;
