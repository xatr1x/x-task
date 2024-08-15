import { Request, Response } from 'express';
import problemService from '../services/problemService';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ProblemCreateDto } from '../dto/problem-create.dto';

export const getProblems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const size = parseInt(req.query.size as string, 10) || 10;

    const result = await problemService.getAllProblems(page, size);
    return res.json(result);
  } catch (e) {
    console.error('Error getting problems', e);
    return res.status(500).send((e as Error).message);
  }
};

export const addProblem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const problemDto = plainToClass(ProblemCreateDto, req.body);
    const errors = await validate(problemDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map((err) => err.constraints),
      });
    }

    const result = await problemService.addProblem(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error adding problem', e);
    return res.status(500).send((e as Error).message);
  }
}

export const deleteProblem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.params.id) {
      return res.status(400).send('No id param')
    }

    const result = await problemService.deleteProblem(+req.params.id);

    return res.json(result);
  } catch (e) {
    console.error('Error deleteing problem', e);
    return res.status(500).send((e as Error).message);
  }
}