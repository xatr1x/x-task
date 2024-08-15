import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class SolutionCreateDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsInt()
  @IsNotEmpty()
  type: number;

  @IsInt()
  @IsNotEmpty()
  problem: number;
}