import { Request, Response } from 'express';
import multer from 'multer';
import brandService from '../services/brandService';
import { BrandCreateDto } from '../dto/brand-create.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BrandChangeDto } from '../dto/brand-change.dto';

const FILES_COUNT_LIMIT = 10;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('files', FILES_COUNT_LIMIT);

export const getBrands = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const size = parseInt(req.query.size as string, 10) || 10;
  
    const result = await brandService.getAllBrands(page, size);
    return res.json(result);
  } catch (e) {
    console.error('Error getting brands', e);
    return res.status(500).send((e as Error).message);
  }
};

export const addBrand = async (
  req: Request,
  res: Response
): Promise<Response>  => {
  try {
    const brandDto = plainToClass(BrandCreateDto, req.body);
    const errors = await validate(brandDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(err => err.constraints),
      });
    }

    const result = await brandService.addBrand(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error adding brand', e);
    return res.status(500).send((e as Error).message);
  }
}

export const changeBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const brandDto = plainToClass(BrandChangeDto, req.body);
    const errors = await validate(brandDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(err => err.constraints),
      });
    }

    const result = await brandService.changeBrand(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error editing brand', e);
    return res.status(500).send((e as Error).message);
  }
}

export const deleteBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.params.id) {
      return res.status(400).send('No id param')
    }

    const result = await brandService.deleteBrand(+req.params.id);

    return res.json(result);
  } catch (e) {
    console.error('Error deleteing brand', e);
    return res.status(500).send((e as Error).message);
  }
}

export const uploadMiddleware = upload;
