import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
export class UpsertAppSettingsDto {
  @IsNumber()
  @Min(0)
  @Max(25)
  @IsNotEmpty()
  vatRate: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  minPrice: number;
}
