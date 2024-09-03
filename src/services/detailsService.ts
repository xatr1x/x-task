import { AppDataSource } from '../data-source';
import { Type } from '../entity/Type';
import { Details } from '../entity/Details';
import { DetailsCreateDto } from '../dto/details-cteate.dto';
import { Problem } from '../entity/Problem';
import { DetailsChangeDto } from '../dto/details-change.dto';
import { RequestProblemDetails } from '../entity/RequestProblemDetails';
import { Request } from '../entity/Request';

const problemRepository = AppDataSource.getRepository(Problem);
const typeRepository = AppDataSource.getRepository(Type);
const detailsRepository = AppDataSource.getRepository(Details);
const requestProblemDetailsRepository = AppDataSource.getRepository(RequestProblemDetails);
const requestRepository = AppDataSource.getRepository(Request);

interface PaginatedDetails {
  count: number;
  currentPage: number;
  size: number;
  details: Details[];
}

const getAllDetails = async (
  page: number,
  size: number,
  problem?: number,
): Promise<PaginatedDetails> => {
  const where: any = {};

  if (problem) {
    where.problem = { id: problem };
  }

  const count = await detailsRepository.count(where);

  const details = await detailsRepository.find({
    skip: (page - 1) * size,
    take: size,
    where,
    relations: ['problem']
  });

  return {
    count,
    currentPage: page,
    size,
    details,
  };
};

const addDetails = async (detailsDto: DetailsCreateDto): Promise<string> => {
  const problem = await problemRepository.findOneBy({
    id: detailsDto.problemId,
  });
  if (!problem) {
    throw new Error('Проблему не знайдено');
  }

  const details = new Details();
  details.description = detailsDto.description;
  details.problem = problem;

  await detailsRepository.save(details);

  return 'Деталі успішно створено';
};

export const addDetailsToProblem = async (
  requestId: number,
  problemId: number,
  detailsId: number
): Promise<string> => {
  const request = await requestRepository.findOne({ where: { id: requestId } });
  if (!request) {
    throw new Error('Заявку не знайдено');
  }

  const problem = await problemRepository.findOne({ where: { id: problemId, type: request.type } });
  if (!problem) {
    throw new Error('Проблему не знайдено');
  }

  const details = await detailsRepository.findOne({ where: { id: detailsId } });
  if (!details) {
    throw new Error('Деталі не знайдено');
  }

  const existingRequestProblemDetails = await requestProblemDetailsRepository.findOne({
    where: { request: { id: requestId }, problem: { id: problemId }, details: { id: detailsId } },
  });

  if (!existingRequestProblemDetails) {
    const requestProblemDetails = new RequestProblemDetails();
    requestProblemDetails.request = request;
    requestProblemDetails.problem = problem;
    requestProblemDetails.details = details;

    await requestProblemDetailsRepository.save(requestProblemDetails);
  }

  return 'Деталі успішно додані до проблеми в межах заявки';
};


const changeDetails = async (details: DetailsChangeDto): Promise<string> => {
  const existingDetails = await detailsRepository.findOneBy({ id: details.id });

  if (!existingDetails) {
    throw new Error(`Details with id ${details.id} not found`);
  }

  existingDetails.description = details.description;

  await detailsRepository.save(existingDetails);

  return 'Details were changed';
};

const deleteDetails = async (id: number): Promise<string> => {
  const existingDetails = await detailsRepository.findOne({
    where: { id },
    relations: ['solutions'],
  });

  if (!existingDetails) {
    throw new Error(`Details with id ${id} not found`);
  }

  await AppDataSource.transaction(async (transactionalEntityManager) => {
    // if (existingDetails.solutions && existingDetails.solutions.length > 0) {
    //   await transactionalEntityManager.remove(existingDetails.solutions);
    // }

    await transactionalEntityManager.remove(existingDetails);
  });

  return 'Details and related solutions were deleted';
};

export default {
  getAllDetails,
  addDetails,
  changeDetails,
  deleteDetails,
  addDetailsToProblem,
};
