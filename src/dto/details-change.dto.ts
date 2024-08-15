import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class DetailsChangeDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}