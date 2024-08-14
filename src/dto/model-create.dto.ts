import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class ModelCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  type: number;

  @IsInt()
  @IsNotEmpty()
  brand: number;
}