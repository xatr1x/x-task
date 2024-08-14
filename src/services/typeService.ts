import { AppDataSource } from '../data-source';
import { Type } from '../entity/Type';
import { TypeCreateDto } from '../dto/type-create.dto';
import { TypeChangeDto } from '../dto/type-change.dto';

const typeRepository = AppDataSource.getRepository(Type);

interface PaginatedTypes {
  count: number;
  currentPage: number;
  size: number;
  types: Type[];
}

const getAllTypes = async (
  page: number,
  size: number
): Promise<PaginatedTypes> => {
  const count = await typeRepository.count();

  const types = await typeRepository.find({
    skip: (page - 1) * size,
    take: size,
  });

  return {
    count,
    currentPage: page,
    size,
    types,
  };
};

const addType = async (type: TypeCreateDto): Promise<string> => {
  await typeRepository.save(type);

  return 'type added';
};

const changeType = async (type: TypeChangeDto): Promise<string> => {
  const existingType = await typeRepository.findOne({ where: { id: type.id } });

  if (!existingType) {
    throw new Error(`Type with id ${type.id} not found`);
  }

  existingType.name = type.name;
  await typeRepository.save(existingType);

  return 'type changed';
};

const deleteType = async (id: number): Promise<string> => {
  const existingType = await typeRepository.findOne({ where: { id: id } });

  if (!existingType) {
    throw new Error(`Type with id ${id} not found`);
  }

  // TODO: delete all linked records
  await typeRepository.delete({ id });

  return 'type was deleted';
};

export default {
  getAllTypes,
  addType,
  changeType,
  deleteType,
};
