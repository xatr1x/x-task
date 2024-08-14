import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class TypeChangeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}