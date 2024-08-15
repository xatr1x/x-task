import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class ProblemChangeDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  id: number;
}