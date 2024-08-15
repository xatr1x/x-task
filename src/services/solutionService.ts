import { AppDataSource } from '../data-source';
import { Type } from '../entity/Type';
import { Problem } from '../entity/Problem';
import { Solution } from '../entity/Solution';
import { SolutionCreateDto } from '../dto/solution-create.dto';
import { SolutionChangeDto } from '../dto/solution-change.dto';

const problemRepository = AppDataSource.getRepository(Problem);
const typeRepository = AppDataSource.getRepository(Type);
const solutionRepository = AppDataSource.getRepository(Solution);

interface PaginatedSolutions {
  count: number;
  currentPage: number;
  size: number;
  solutions: Solution[];
}

const getAllSolutions = async (page: number, size: number): Promise<PaginatedSolutions> => {
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

const addSoulution = async (solution: SolutionCreateDto): Promise<string> => {
  const existingType = await typeRepository.findOne({ where: { id: solution.type }});

  if (!existingType) {
    throw new Error(`type with id ${solution.type} not found`);
  }

  const existingProblem = await problemRepository.findOne({ where: { id: solution.problem }});

  if (!existingProblem) {
    throw new Error(`problem with id ${solution.problem} not found`);
  }

  await solutionRepository.save({
    description: solution.description,
    comment: solution.comment,
    type: { id: solution.type },
    problem: { id: solution.problem }
  });

  return 'Solution was added';
}

const changeSolution = async (solution: SolutionChangeDto): Promise<string> => {
  const existingSolution = await solutionRepository.findOneBy({ id: solution.id })

  if (!existingSolution) {
    throw new Error(`Details with id ${solution.id} not found`);
  }

  existingSolution.description = solution.description;
  existingSolution.comment = solution.comment;

  await solutionRepository.save(existingSolution);

  return 'Solution was changed';
}

const deleteSolution = async (id: number): Promise<string> => {
  const existingSolution = await solutionRepository.findOne({ where: { id }});

  if (!existingSolution) {
    throw new Error(`Solution with id ${id} not found`);
  }

  await solutionRepository.remove(existingSolution);

  return 'Solution was removed';
}

export default {
  getAllSolutions,
  addSoulution,
  changeSolution,
  deleteSolution,
}