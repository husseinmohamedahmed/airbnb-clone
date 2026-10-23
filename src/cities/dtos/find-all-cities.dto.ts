import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dtos/pagination.dto';
export class FindAllCitiesDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsMongoId()
  country: string;
}
