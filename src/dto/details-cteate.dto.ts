import { IsInt, IsNotEmpty } from 'class-validator';

export class DetailsCreateDto {
  @IsNotEmpty()
  @IsInt()
  problemId: number;

  @IsNotEmpty()
  description: string;
}