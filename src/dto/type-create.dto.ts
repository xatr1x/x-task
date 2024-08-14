import { IsString, IsNotEmpty } from 'class-validator';

export class TypeCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}