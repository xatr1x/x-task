import { Request, Response } from 'express';
import modelService from '../services/modelService';
import { ModelCreateDto } from '../dto/model-create.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ModelChangeDto } from '../dto/model-change.dto';

export const getModels = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const size = parseInt(req.query.size as string, 10) || 10;
  
    const result = await modelService.getAllModels(page, size);
    return res.json(result);
  } catch (e) {
    console.error('Error getting models', e);
    return res.status(500).send((e as Error).message);
  }
};

export const addModel = async (
  req: Request,
  res: Response
): Promise<Response>  => {
  try {
    const brandDto = plainToClass(ModelCreateDto, req.body);
    const errors = await validate(brandDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(err => err.constraints),
      });
    }

    const result = await modelService.addModel(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error adding model', e);
    return res.status(500).send((e as Error).message);
  }
}

export const changeModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const brandDto = plainToClass(ModelChangeDto, req.body);
    const errors = await validate(brandDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(err => err.constraints),
      });
    }

    const result = await modelService.changeModel(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error editing model', e);
    return res.status(500).send((e as Error).message);
  }
}

export const deleteModel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.params.id) {
      return res.status(400).send('No id param')
    }

    const result = await modelService.deleteModel(+req.params.id);

    return res.json(result);
  } catch (e) {
    console.error('Error deleteing model', e);
    return res.status(500).send((e as Error).message);
  }
}