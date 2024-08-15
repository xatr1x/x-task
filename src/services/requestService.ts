import { Request } from '../entity/Request';
import { Model } from '../entity/Model';
import { AppDataSource } from '../data-source';
import { Brand } from '../entity/Brand';
import { Type } from '../entity/Type';
import { RequestCreateDto } from '../dto/request-create.dto';
import { Problem } from '../entity/Problem';

const requestRepository = AppDataSource.getRepository(Request);
const typeRepository = AppDataSource.getRepository(Type);
const brandRepository = AppDataSource.getRepository(Brand);
const modelRepository = AppDataSource.getRepository(Model);
const problemRepository = AppDataSource.getRepository(Problem);

interface PaginatedRequests {
  count: number;
  currentPage: number;
  size: number;
  requests: Request[];
}

const getAllRequests = async (page: number, size: number): Promise<PaginatedRequests> => {
  const count = await requestRepository.count({ where: { isActive: true }});

  const requests = await requestRepository.find({
    skip: (page - 1) * size,
    take: size,
    where: {
      isActive: true
    }
  });

  return {
    count,
    currentPage: page,
    size,
    requests,
  };
};

const addRequest = async (request: RequestCreateDto): Promise<string> => {
  const existingType = await typeRepository.findOne({ where: { id: request.type }});

  if (!existingType) {
    throw new Error(`type with id ${request.type} not found`);
  }

  const existingBrand = await brandRepository.findOne({ where: { id: request.brand } });

  if (!existingBrand) {
    throw new Error(`brand with id ${request.brand} not found`);
  }

  const existingModel = await modelRepository.findOne({ where: { id: request.model } });

  if (!existingModel) {
    throw new Error(`model with id ${request.brand} not found`);
  }

  const newRequest = await requestRepository.save({
    type: { id: request.type },
    brand: { id: request.brand },
    model: { id: request.model }
  });

  for (let i = 0; i < request.problems.length; i++) {
    await problemRepository.save({ description: request.problems[i], request: { id: newRequest.id } });
  }

  return 'request added';
}

const deleteRequest = async (id: number): Promise<string> => {
  const existingRequest = await requestRepository.findOne({ where: { id }});

  if (!existingRequest) {
    throw new Error(`request with id ${id} not found`);
  }

  existingRequest.isActive = false;

  await requestRepository.save(existingRequest);

  return 'Request was deleted';
}

export default {
  getAllRequests,
  addRequest,
  deleteRequest
}