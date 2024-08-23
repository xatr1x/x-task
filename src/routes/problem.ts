import { Router } from 'express';
import {
  getProblems,
  addProblem,
  addProblemToTask
} from '../controllers/problemController';

const router = Router();

router.get('/', getProblems);
router.post('/', addProblem);
router.put('/:requestId/:problemId', addProblemToTask);

export default router;