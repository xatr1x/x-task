import { AppDataSource } from '../data-source';
import { Brand } from '../entity/Brand';
import { BrandCreateDto } from '../dto/brand-create.dto';
import { BrandChangeDto } from '../dto/brand-change.dto';
import { Type } from '../entity/Type';

const brandRepository = AppDataSource.getRepository(Brand);
const typeRepository = AppDataSource.getRepository(Type);

interface PaginatedBrands {
  count: number;
  currentPage: number;
  size: number;
  brands: Brand[];
}

const getAllBrands = async (page: number, size: number): Promise<PaginatedBrands> => {
  const count = await brandRepository.count();

  const brands = await brandRepository.find({
    skip: (page - 1) * size,
    take: size,
  });

  return {
    count,
    currentPage: page,
    size,
    brands,
  };;
};

const addBrand = async (brand: BrandCreateDto): Promise<string> => {
  await brandRepository.save({
    name: brand.name,
    type: { id: brand.type }
  });

  return 'type added';
}

const changeBrand = async (brand: BrandChangeDto): Promise<string> => {
  const existingBrand = await brandRepository.findOne({ where: { id: brand.id } });

  if (!existingBrand) {
    throw new Error(`brand with id ${brand.id} not found`);
  }

  const existingType = await typeRepository.findOne({ where: { id: brand.type }});

  if (!existingType) {
    throw new Error(`type with id ${brand.id} not found`);
  }

  existingBrand.name = brand.name;
  existingBrand.type = existingType;

  await brandRepository.save(existingBrand);

  return 'brand changed';
};

const deleteBrand = async (id: number): Promise<string> => {
  const existingBrand = await brandRepository.findOne({ where: { id: id } });

  if (!existingBrand) {
    throw new Error(`brand with id ${id} not found`);
  }

  await brandRepository.delete({ id });

  return 'brand deleted';
}

export default {
  getAllBrands,
  addBrand,
  changeBrand,
  deleteBrand,
};
