import { Router } from 'express';
import {
  getBrands,
  addBrand,
  uploadMiddleware,
  changeBrand,
  deleteBrand,
} from '../controllers/brandController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getBrands);
router.post('/', addBrand);
router.patch('/', changeBrand);
router.delete('/:id', deleteBrand);

export default router;
