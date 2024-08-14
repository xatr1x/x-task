import { Model } from '../entity/Model';
import { AppDataSource } from '../data-source';
import { Brand } from '../entity/Brand';
import { Type } from '../entity/Type';
import { ModelCreateDto } from '../dto/model-create.dto';
import { ModelChangeDto } from '../dto/model-change.dto';
import { Problem } from '../entity/Problem';

const brandRepository = AppDataSource.getRepository(Brand);
const typeRepository = AppDataSource.getRepository(Type);
const modelRepository = AppDataSource.getRepository(Model);
const problemRepository = AppDataSource.getRepository(Problem);

interface PaginatedProblems {
  count: number;
  currentPage: number;
  size: number;
  problems: Problem[];
}

const getAllProblems = async (page: number, size: number): Promise<PaginatedProblems> => {
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

const addProblem = async (model: ModelCreateDto): Promise<string> => {
  const existingBrand = await brandRepository.findOne({ where: { id: model.brand } });

  if (!existingBrand) {
    throw new Error(`brand with id ${model.brand} not found`);
  }

  const existingType = await typeRepository.findOne({ where: { id: model.type }});

  if (!existingType) {
    throw new Error(`type with id ${model.type} not found`);
  }

  await modelRepository.save({
    name: model.name,
    type: { id: model.type },
    brand: { id: model.brand }
  });

  return 'model added';
}