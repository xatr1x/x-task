import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class DetailsCreateDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  type: number;

  @IsInt()
  @IsNotEmpty()
  problem: number;
}