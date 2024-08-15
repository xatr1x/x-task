import { Router } from 'express';
import {
  getDetails,
  addDetails,
  changeDetails,
  deleteDetails,
} from '../controllers/detailsController';

const router = Router();

router.get('/', getDetails);
router.post('/', addDetails);
router.patch('/', changeDetails);
router.delete('/:id', deleteDetails);

export default router;
