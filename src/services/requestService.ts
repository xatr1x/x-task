import { Request } from '../entity/Request';
import { Model } from '../entity/Model';
import { AppDataSource } from '../data-source';
import { Brand } from '../entity/Brand';
import { Type } from '../entity/Type';
import { RequestCreateDto } from '../dto/request-create.dto';
import { Problem } from '../entity/Problem';
import { RequestProblemDetails } from '../entity/RequestProblemDetails';

const requestRepository = AppDataSource.getRepository(Request);
const typeRepository = AppDataSource.getRepository(Type);
const brandRepository = AppDataSource.getRepository(Brand);
const modelRepository = AppDataSource.getRepository(Model);
const problemRepository = AppDataSource.getRepository(Problem);
const requestProblemDetailsRepository = AppDataSource.getRepository(RequestProblemDetails)

interface PaginatedRequests {
  count: number;
  currentPage: number;
  size: number;
  requests: Request[];
}

const getAllRequests = async (
  page: number,
  size: number
): Promise<PaginatedRequests> => {
  const count = await requestRepository.count();

  const requests = await requestRepository.find({
    skip: (page - 1) * size,
    take: size,
    relations: ['type', 'brand', 'model']
  });

  return {
    count,
    currentPage: page,
    size,
    requests,
  };
};

const getRequest = async (id: number): Promise<Request> => {
  const request = await requestRepository.findOne({
    where: { id },
    relations: ['type', 'brand', 'model', 'problems'],
  });

  if (!request) {
    throw new Error('No such request');
  }

  const problemsWithDetails = await Promise.all(
    request.problems.map(async (problem) => {
      const details = await requestProblemDetailsRepository.find({
        where: { request: { id }, problem: { id: problem.id } },
        relations: ['details'],
      });
      return {
        ...problem,
        details: details.map((d) => d.details),
      };
    })
  );

  return {
    ...request,
    problems: problemsWithDetails,
  };
};


const addRequest = async (requestDto: RequestCreateDto): Promise<number> => {
  const type = await typeRepository.findOneBy({ id: requestDto.typeId });
  if (!type) {
    throw new Error('Тип не знайдено');
  }

  const request = new Request();
  request.type = type;

  if (requestDto.brandId) {
    const brand = await brandRepository.findOneBy({ id: requestDto.brandId });
    if (!brand) {
      throw new Error('Бренд не знайдено');
    }
    request.brand = brand;
  }

  if (requestDto.modelId) {
    const model = await modelRepository.findOneBy({ id: requestDto.modelId });
    if (!model) {
      throw new Error('Модель не знайдено');
    }
    request.model = model;
  }

  const result = await requestRepository.save(request);

  return result.id;
};

const deleteRequest = async (id: number): Promise<string> => {
  const existingRequest = await requestRepository.findOne({ where: { id } });

  if (!existingRequest) {
    throw new Error(`request with id ${id} not found`);
  }

  // existingRequest.isActive = false;

  await requestRepository.save(existingRequest);

  return 'Request was deleted';
};

export default {
  getAllRequests,
  addRequest,
  deleteRequest,
  getRequest,
};
