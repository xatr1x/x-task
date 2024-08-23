import { Router } from 'express';
import {
  getDetails,
  addDetails,
  changeDetails,
  deleteDetails,
  addDetailsToProblem,
} from '../controllers/detailsController';

const router = Router();

router.get('/', getDetails);
router.post('/', addDetails);
router.patch('/', changeDetails);
router.delete('/:id', deleteDetails);
router.put('/:problemId/:detailsId', addDetailsToProblem);

export default router;
