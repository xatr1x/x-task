import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class BrandChangeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  type: number;

  @IsInt()
  @IsNotEmpty()
  id: number;
}