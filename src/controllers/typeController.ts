import { Request, Response } from 'express';
import multer from 'multer';
import typeService from '../services/typeService';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { TypeCreateDto } from '../dto/type-create.dto';
import { TypeChangeDto } from '../dto/type-change.dto';

const FILES_COUNT_LIMIT = 10;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('files', FILES_COUNT_LIMIT);

export const getTypes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const size = parseInt(req.query.size as string, 10) || 10;

    const result = await typeService.getAllTypes(page, size);
    return res.json(result);
  } catch (e) {
    console.error('Error getting types', e);
    return res.status(500).send((e as Error).message);
  }
};

export const addType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const typeDto = plainToClass(TypeCreateDto, req.body);
    const errors = await validate(typeDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((err) => err.constraints),
      });
    }

    const result = await typeService.addType(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error adding types', e);
    return res.status(500).send((e as Error).message);
  }
};

export const changeType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const typeDto = plainToClass(TypeChangeDto, req.body);
    const errors = await validate(typeDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((err) => err.constraints),
      });
    }

    const result = await typeService.changeType(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error changing types', e);
    return res.status(500).send((e as Error).message);
  }
};

export const deleteType = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.params.id) {
      return res.status(400).send('No id param')
    }

    const result = await typeService.deleteType(+req.params.id);

    return res.json(result);
  } catch (e) {
    console.error('Error deleting types', e);
    return res.status(500).send((e as Error).message);
  }
}

export const uploadMiddleware = upload;
