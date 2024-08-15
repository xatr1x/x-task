import { IsString, IsInt, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProblemCreateDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  request: number;

  @IsInt()
  @IsNotEmpty()
  type: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsDto)
  details: DetailsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SolutionCreateDto)
  solutions: SolutionCreateDto[];
}

export class DetailsDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class SolutionCreateDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
