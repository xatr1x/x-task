import { AppDataSource } from '../data-source';
import { Problem } from '../entity/Problem';
import { ProblemCreateDto } from '../dto/problem-create.dto';
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
  problems: any[];
}

const getAllProblems = async (
  page: number,
  size: number,
  type?: number
): Promise<PaginatedProblems> => {
  const where: any = {};

  if (type) {
    where.type = { id: type };
  }
  const count = await problemRepository.count(where);

  const problems = await problemRepository.find({
    skip: (page - 1) * size,
    take: size,
    relations: ['type'],
    where,
  });

  return {
    count,
    currentPage: page,
    size,
    problems: groupProblems(problems),
  };
};

export const addProblem = async (
  problemDto: ProblemCreateDto
): Promise<string> => {
  const type = await typeRepository.findOneBy({ id: problemDto.typeId });
  if (!type) {
    throw new Error('тип не знайдено');
  }

  const problem = new Problem();
  problem.description = problemDto.description;
  problem.type = type;

  await problemRepository.save(problem);

  return 'Проблему успішно створено';
};

export const addProblemToTask = async (
  requestId: number,
  problemId: number
): Promise<string> => {
  const request = await requestRepository.findOne({
    where: { id: requestId },
    relations: ['problems'],
  });

  if (!request) {
    throw new Error('Заявку не знайдено');
  }

  const problem = await problemRepository.findOne({
    where: { id: problemId, type: request.type },
  });

  if (!problem) {
    throw new Error('Проблему не знайдено');
  }

  if (!request.problems.some(p => p.id === problem.id)) {
    request.problems.push(problem);
    await requestRepository.save(request);
  }

  return 'Проблему успішно додано до заявки';
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
  return 'Problem and related details and solutions were deleted';
};

const groupProblems = (problems: any) => {
  const grouped: any = {};

  problems.forEach(
    (problem: { type: { name: any }; id: any; description: any }) => {
      const typeName = problem.type.name;

      if (!grouped[typeName]) {
        grouped[typeName] = [];
      }

      grouped[typeName].push({
        id: problem.id,
        problem: problem.description,
      });
    }
  );

  return Object.keys(grouped).map((type) => ({
    type,
    problems: grouped[type],
  }));
};

export default {
  getAllProblems,
  addProblem,
  changeProblem,
  deleteProblem,
  addProblemToTask,
};
