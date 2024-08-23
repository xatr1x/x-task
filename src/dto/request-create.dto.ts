import { IsInt, IsNotEmpty, IsArray } from 'class-validator';

export class RequestCreateDto {
  @IsInt()
  @IsNotEmpty()
  typeId: number;

  @IsInt()
  brandId?: number;

  @IsInt()
  modelId?: number;
}