import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SolutionCreateDto {
  @IsNotEmpty()
  @IsInt()
  requestId: number;

  @IsNotEmpty()
  @IsInt()
  typeId: number

  @IsOptional()
  @IsInt()
  brandId: number;

  @IsOptional()
  @IsInt()
  modelId: number;

  @IsNotEmpty()
  @IsNumber()
  problemId: number

  @IsNotEmpty()
  @IsInt()
  detailsId: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
