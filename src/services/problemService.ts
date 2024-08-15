import { AppDataSource } from '../data-source';
import { Problem } from '../entity/Problem';
import {
  ProblemCreateDto,
  DetailsDto,
  SolutionCreateDto,
} from '../dto/problem-create.dto';
import { Request } from '../entity/Request';
import { Details } from '../entity/Details';
import { Solution } from '../entity/Solution';
import { ProblemChangeDto } from '../dto/problem-change.dto';
import { Type } from '../entity/Type';

const problemRepository = AppDataSource.getRepository(Problem);
const requestRepository = AppDataSource.getRepository(Request);
const detailsRepository = AppDataSource.getRepository(Details);
const solutionRepository = AppDataSource.getRepository(Solution);
const typeRepository = AppDataSource.getRepository(Type);

interface PaginatedProblems {
  count: number;
  currentPage: number;
  size: number;
  problems: Problem[];
}

const getAllProblems = async (
  page: number,
  size: number
): Promise<PaginatedProblems> => {
  const count = await problemRepository.count();

  const problems = await problemRepository.find({
    skip: (page - 1) * size,
    take: size,
  });

  return {
    count,
    currentPage: page,
    size,
    problems,
  };
};

export const addProblem = async (problem: ProblemCreateDto): Promise<string> => {
  const request = await requestRepository.findOneBy({ id: problem.request });

  if (!request) {
    throw new Error(`Request with id ${problem.request} not found`);
  }

  const type = await typeRepository.findOneBy({ id: problem.type });

  if (!type) {
    throw new Error(`Type with id ${problem.type} not found`);
  }

  const newProblem = new Problem();
  newProblem.description = problem.description;
  newProblem.request = request;
  newProblem.type = type;

  const details = problem.details.map((detailDto) => {
    const detail = new Details();
    detail.description = detailDto.description;
    detail.problem = newProblem;
    return detail;
  });

  const solutions = problem.solutions.map((solutionDto) => {
    const solution = new Solution();
    solution.description = solutionDto.description;
    solution.comment = solutionDto.comment;
    solution.problem = newProblem;
    return solution;
  });

  await AppDataSource.transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.save(newProblem);
    await transactionalEntityManager.save(details);
    await transactionalEntityManager.save(solutions);
  });

  return 'Problem added';
};

export const changeProblem = async (
  problem: ProblemChangeDto
): Promise<string> => {
  const existingProblem = await problemRepository.findOne({
    where: { id: problem.id },
  });

  if (!existingProblem) {
    throw new Error(`Problem with id ${problem.id} not found`);
  }

  existingProblem.description = problem.description;

  await problemRepository.save(existingProblem);

  return 'Problem was changed';
};

export const deleteProblem = async (id: number): Promise<string> => {
  const existingProblem = await problemRepository.findOne({ where: { id } });

  if (!existingProblem) {
    throw new Error(`Problem with id ${id} not found`);
  }

  await AppDataSource.transaction(async (transactionalEntityManager) => {
    if (existingProblem.details && existingProblem.details.length > 0) {
      await transactionalEntityManager.remove(existingProblem.details);
    }

    if (existingProblem.solutions && existingProblem.solutions.length > 0) {
      await transactionalEntityManager.remove(existingProblem.solutions);
    }

    await transactionalEntityManager.remove(existingProblem);
  });

  return 'Problem and related details and solutions were deleted';
};

export default {
  getAllProblems,
  addProblem,
  changeProblem,
  deleteProblem,
};
