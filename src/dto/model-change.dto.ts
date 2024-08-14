import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class ModelChangeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  id: number;
}