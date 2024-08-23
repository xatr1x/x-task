import { Router } from 'express';
import {
  getSolutions,
  addSoulution,
  changeSolution,
  deleteSolution,
  findSolution,
} from '../controllers/solutionController';

const router = Router();

router.get('/', getSolutions);
router.post('/', addSoulution);
router.patch('/', changeSolution);
router.delete('/:id', deleteSolution);
router.post('/find', findSolution);

export default router;
