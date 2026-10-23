import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CountryIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
