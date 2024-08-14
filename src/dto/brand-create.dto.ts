import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class BrandCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  type: number;
}