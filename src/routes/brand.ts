import { Router } from 'express';
import {
  getBrands,
  addBrand,
  changeBrand,
  deleteBrand,
} from '../controllers/brandController';

const router = Router();

router.get('/', getBrands);
router.post('/', addBrand);
router.patch('/', changeBrand);
router.delete('/:id', deleteBrand);

export default router;
