import { IsInt, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class SolutionFindDto {
  @IsNotEmpty()
  @IsInt()
  typeId: number;

  @IsOptional()
  @IsInt()
  brandId?: number;

  @IsOptional()
  @IsInt()
  modelId?: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  problemIds?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  detailsIds?: number[];
}
