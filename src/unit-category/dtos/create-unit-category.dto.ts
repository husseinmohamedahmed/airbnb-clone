import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUnitCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  icon?: string;
}
