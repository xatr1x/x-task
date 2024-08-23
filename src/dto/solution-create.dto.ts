import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class SolutionCreateDto {
  @IsNotEmpty()
  @IsInt()
  detailsId: number;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  comment?: string;
}
