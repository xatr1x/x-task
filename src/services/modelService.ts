import { Model } from '../entity/Model';
import { AppDataSource } from '../data-source';
import { Brand } from '../entity/Brand';
import { Type } from '../entity/Type';
import { ModelCreateDto } from '../dto/model-create.dto';
import { ModelChangeDto } from '../dto/model-change.dto';

const brandRepository = AppDataSource.getRepository(Brand);
const typeRepository = AppDataSource.getRepository(Type);
const modelRepository = AppDataSource.getRepository(Model);

interface PaginatedModels {
  count: number;
  currentPage: number;
  size: number;
  models: Model[];
}

const getAllModels = async (page: number, size: number, type?: number, brand?: number): Promise<PaginatedModels> => {
  const where: any = {};

  if (type && brand) {
    where.type = { id: type };
    where.brand = { id: brand };
  }

  const count = await modelRepository.count(where);

  const models = await modelRepository.find({
    skip: (page - 1) * size,
    take: size,
    relations: ['type', 'brand'],
    where
  });

  return {
    count,
    currentPage: page,
    size,
    models,
  };
};

const addModel = async (model: ModelCreateDto): Promise<string> => {
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

const changeModel = async (model: ModelChangeDto): Promise<string> => {
  const existingModel = await modelRepository.findOne({ where: {
    id: model.id
  }});

  if (!existingModel) {
    throw new Error(`model with id ${model.id} not found`);
  }

  existingModel.name = model.name;

  await modelRepository.save(existingModel);

  return 'model changed';
};

const deleteModel = async (id: number): Promise<string> => {
  const existingModel= await modelRepository.findOne({ where: { id: id } });

  if (!existingModel) {
    throw new Error(`brand with id ${id} not found`);
  }

  await modelRepository.delete({ id });

  return 'model deleted';
}

export default {
  getAllModels,
  addModel,
  changeModel,
  deleteModel
}