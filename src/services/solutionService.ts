import { AppDataSource } from '../data-source';
import { Solution } from '../entity/Solution';
import { SolutionCreateDto } from '../dto/solution-create.dto';
import { SolutionChangeDto } from '../dto/solution-change.dto';
import { Details } from '../entity/Details';
import { SolutionFindDto } from '../dto/solution-find.dto';

const detailsRepository = AppDataSource.getRepository(Details);
const solutionRepository = AppDataSource.getRepository(Solution);

interface PaginatedSolutions {
  count: number;
  currentPage: number;
  size: number;
  solutions: Solution[];
}

const getAllSolutions = async (
  page: number,
  size: number
): Promise<PaginatedSolutions> => {
  const count = await solutionRepository.count();

  const solutions = await solutionRepository.find({
    skip: (page - 1) * size,
    take: size,
  });

  return {
    count,
    currentPage: page,
    size,
    solutions,
  };
};

const addSoulution = async (
  solutionDto: SolutionCreateDto
): Promise<string> => {
  const details = await detailsRepository.findOneBy({
    id: solutionDto.detailsId,
  });
  if (!details) {
    throw new Error('Деталі не знайдено');
  }

  const solution = new Solution();
  solution.description = solutionDto.description;
  solution.comment = solutionDto.comment || null;
  solution.details = details;

  await solutionRepository.save(solution);

  return 'Рішення успішно створено';
};

const changeSolution = async (solution: SolutionChangeDto): Promise<string> => {
  const existingSolution = await solutionRepository.findOneBy({
    id: solution.id,
  });

  if (!existingSolution) {
    throw new Error(`Details with id ${solution.id} not found`);
  }

  existingSolution.description = solution.description;
  existingSolution.comment = solution.comment;

  await solutionRepository.save(existingSolution);

  return 'Solution was changed';
};

const deleteSolution = async (id: number): Promise<string> => {
  const existingSolution = await solutionRepository.findOne({ where: { id } });

  if (!existingSolution) {
    throw new Error(`Solution with id ${id} not found`);
  }

  await solutionRepository.remove(existingSolution);

  return 'Solution was removed';
};

export const findSolution = async (
  solutionFindDto: SolutionFindDto
): Promise<Solution[]> => {
  const query = solutionRepository
    .createQueryBuilder('solution')
    .innerJoin('solution.details', 'details')
    .innerJoin('details.problem', 'problem')
    .innerJoin('problem.request', 'request')
    .where('request.typeId = :typeId', { typeId: solutionFindDto.typeId });

  if (solutionFindDto.brandId) {
    query.andWhere('request.brandId = :brandId', {
      brandId: solutionFindDto.brandId,
    });
  }

  if (solutionFindDto.modelId) {
    query.andWhere('request.modelId = :modelId', {
      modelId: solutionFindDto.modelId,
    });
  }

  if (solutionFindDto.problemIds && solutionFindDto.problemIds.length > 0) {
    query.andWhere('problem.id IN (:...problemIds)', {
      problemIds: solutionFindDto.problemIds,
    });
  }

  if (solutionFindDto.detailsIds && solutionFindDto.detailsIds.length > 0) {
    query.andWhere('details.id IN (:...detailsIds)', {
      detailsIds: solutionFindDto.detailsIds,
    });
  }

  const solutions = await query.getMany();

  return solutions;
};

export default {
  getAllSolutions,
  addSoulution,
  changeSolution,
  deleteSolution,
  findSolution,
};
