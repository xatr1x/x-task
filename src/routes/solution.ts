import { Router } from 'express';
import {
  getSolutions,
  addSoulution,
  changeSolution,
  deleteSolution,
} from '../controllers/solutionController';

const router = Router();

router.get('/', getSolutions);
router.post('/', addSoulution);
router.patch('/', changeSolution);
router.delete('/:id', deleteSolution);

export default router;
