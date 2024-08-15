import { Request, Response } from 'express';
import solutionService from '../services/solutionService';
import { ModelCreateDto } from '../dto/model-create.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ModelChangeDto } from '../dto/model-change.dto';
import { SolutionCreateDto } from '../dto/problem-create.dto';

export const getSolutions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const size = parseInt(req.query.size as string, 10) || 10;
  
    const result = await solutionService.getAllSolutions(page, size);
    return res.json(result);
  } catch (e) {
    console.error('Error getting soltions', e);
    return res.status(500).send((e as Error).message);
  }
};

export const addSoulution = async (
  req: Request,
  res: Response
): Promise<Response>  => {
  try {
    const solutionDto = plainToClass(SolutionCreateDto, req.body);
    const errors = await validate(solutionDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(err => err.constraints),
      });
    }

    const result = await solutionService.addSoulution(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error adding solution', e);
    return res.status(500).send((e as Error).message);
  }
}

export const changeSolution= async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const solutionDto = plainToClass(ModelChangeDto, req.body);
    const errors = await validate(solutionDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(err => err.constraints),
      });
    }

    const result = await solutionService.changeSolution(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error editing solution', e);
    return res.status(500).send((e as Error).message);
  }
}

export const deleteSolution = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.params.id) {
      return res.status(400).send('No id param')
    }

    const result = await solutionService.deleteSolution(+req.params.id);

    return res.json(result);
  } catch (e) {
    console.error('Error deleteing solution', e);
    return res.status(500).send((e as Error).message);
  }
}