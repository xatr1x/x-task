import { IsString, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class SolutionChangeDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}