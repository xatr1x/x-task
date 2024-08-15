import { AppDataSource } from '../data-source';
import { Type } from '../entity/Type';
import { Details } from '../entity/Details';
import { DetailsCreateDto } from '../dto/details-cteate.dto';
import { Problem } from '../entity/Problem';
import { DetailsChangeDto } from '../dto/details-change.dto';

const problemRepository = AppDataSource.getRepository(Problem);
const typeRepository = AppDataSource.getRepository(Type);
const detailsRepository = AppDataSource.getRepository(Details);

interface PaginatedDetails {
  count: number;
  currentPage: number;
  size: number;
  details: Details[];
}

const getAllModels = async (page: number, size: number): Promise<PaginatedDetails> => {
  const count = await detailsRepository.count();

  const details = await detailsRepository.find({
    skip: (page - 1) * size,
    take: size,
  });

  return {
    count,
    currentPage: page,
    size,
    details,
  };
};

const addDetails = async (details: DetailsCreateDto): Promise<string> => {
  const existingType = await typeRepository.findOne({ where: { id: details.type }});

  if (!existingType) {
    throw new Error(`type with id ${details.type} not found`);
  }

  const existingProblem = await problemRepository.findOne({ where: { id: details.problem }});

  if (!existingProblem) {
    throw new Error(`problem with id ${details.problem} not found`);
  }

  await detailsRepository.save({
    name: details.description,
    type: { id: details.type },
    problem: { id: details.problem }
  });

  return 'Details were added';
}

const changeDetails = async (details: DetailsChangeDto): Promise<string> => {
  const existingDetails = await detailsRepository.findOneBy({ id: details.id })

  if (!existingDetails) {
    throw new Error(`Details with id ${details.id} not found`);
  }

  existingDetails.description = details.description;

  await detailsRepository.save(existingDetails);

  return 'Details were changed';
}

const deleteDetails = async (id: number): Promise<string> => {
  const existingDetails = await detailsRepository.findOne({ where: { id }, relations: ['solutions'] });

  if (!existingDetails) {
    throw new Error(`Details with id ${id} not found`);
  }

  await AppDataSource.transaction(async transactionalEntityManager => {
    if (existingDetails.solutions && existingDetails.solutions.length > 0) {
      await transactionalEntityManager.remove(existingDetails.solutions);
    }

    await transactionalEntityManager.remove(existingDetails);
  });

  return 'Details and related solutions were deleted';
}

export default {
  getAllModels,
  addDetails,
  changeDetails,
  deleteDetails,
}