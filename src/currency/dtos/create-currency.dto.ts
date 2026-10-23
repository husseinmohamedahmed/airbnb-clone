import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  currencyCode: string;
}
