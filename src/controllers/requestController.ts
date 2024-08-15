import { Request, Response } from 'express';
import requestService from '../services/requestService';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RequestCreateDto } from '../dto/request-create.dto';

export const getRequests = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const size = parseInt(req.query.size as string, 10) || 10;
  
    const result = await requestService.getAllRequests(page, size);
    return res.json(result);
  } catch (e) {
    console.error('Error getting request', e);
    return res.status(500).send((e as Error).message);
  }
};

export const addRequest = async (
  req: Request,
  res: Response
): Promise<Response>  => {
  try {
    const requestDto = plainToClass(RequestCreateDto, req.body);
    const errors = await validate(requestDto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.map(err => err.constraints),
      });
    }

    const result = await requestService.addRequest(req.body);

    return res.json(result);
  } catch (e) {
    console.error('Error adding request', e);
    return res.status(500).send((e as Error).message);
  }
}

export const deleteRequest = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.params.id) {
      return res.status(400).send('No id param')
    }

    const result = await requestService.deleteRequest(+req.params.id);

    return res.json(result);
  } catch (e) {
    console.error('Error deleteing request', e);
    return res.status(500).send((e as Error).message);
  }
}