import { IsInt, IsNotEmpty, IsArray } from 'class-validator';

export class ProblemCreateDto {
  @IsNotEmpty()
  @IsInt()
  typeId: number;

  @IsNotEmpty()
  description: string;
}