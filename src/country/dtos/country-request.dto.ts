import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CountryRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  countryCode?: string;
}
