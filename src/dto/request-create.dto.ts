import { IsInt, IsNotEmpty, IsArray } from 'class-validator';

export class RequestCreateDto {
  @IsInt()
  @IsNotEmpty()
  type: number;

  @IsInt()
  @IsNotEmpty()
  brand: number;

  @IsInt()
  @IsNotEmpty()
  model: number;

  @IsArray()
  @IsNotEmpty()
  problems: string[]
}