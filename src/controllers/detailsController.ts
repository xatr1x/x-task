import { Request, Response } from 'express';
import detailsService from '../services/detailsService';
import { ModelCreateDto } from '../dto/model-create.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ModelChangeDto } from '../dto/model-change.dto';
import { DetailsCreateDto } from '../dto/details-cteate.dto';

export const getDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const size = parseInt(req.query.size as string, 10) || 10;
    const problem = parseInt(req.query.problem as string, 10) || undefined;

    const result = await detailsService.getAllDetails(page, size, problem);
    return res.json(result);
  } catch (e) {
    console.error('Error getting details', e);
    return res.status(500).send((e as Error).message);
  }
};

export const addDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const detailsDto = plainToClass(DetailsCreateDto, req.body);
    const errors = await validate(detailsDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((err) => err.constraints),
      });
    }

    const result = await detailsService.addDetails(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error adding details', e);
    return res.status(500).send((e as Error).message);
  }
};

export const addDetailsToProblem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const result = await detailsService.addDetailsToProblem(
      +req.params.requestId,
      +req.params.problemId,
      +req.params.detailsId
    );

    return res.json(result);
  } catch (e) {
    console.error('Помилка при додаванні деталей до проблеми', e);
    return res.status(500).send((e as Error).message);
  }
};

export const changeDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const detailsDto = plainToClass(ModelChangeDto, req.body);
    const errors = await validate(detailsDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((err) => err.constraints),
      });
    }

    const result = await detailsService.changeDetails(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error editing details', e);
    return res.status(500).send((e as Error).message);
  }
};

export const deleteDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.params.id) {
      return res.status(400).send('No id param');
    }

    const result = await detailsService.deleteDetails(+req.params.id);

    return res.json(result);
  } catch (e) {
    console.error('Error deleteing details', e);
    return res.status(500).send((e as Error).message);
  }
};
