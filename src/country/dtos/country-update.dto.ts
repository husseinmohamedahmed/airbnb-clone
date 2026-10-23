import { IsOptional, IsString } from 'class-validator';

export class CountryUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  countryCode?: string;
}
