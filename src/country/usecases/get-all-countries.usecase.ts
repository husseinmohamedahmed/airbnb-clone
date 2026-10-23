import { Injectable } from '@nestjs/common';
import { QueryFilter } from 'mongoose';
import { Country } from '../schemas/country-schema';
import { plainToInstance } from 'class-transformer';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { CountryFilterDto } from '../dtos/country-filter.dto';
import { CountryRepository } from '../repository/country.repository';
import { PaginatedResult } from '../../common/data-access/base-repository';
@Injectable()
export class GetAllCountriesUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(
    query: CountryFilterDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    const matchQuery: QueryFilter<Country> = { isDeleted: false };
    if (query?.name) {
      matchQuery.name = { $regex: query.name, $options: 'i' };
    }
    if (query?.countryCode) {
      matchQuery.countryCode = query.countryCode;
    }

    const result = await this.countryRepository.findPaginated(matchQuery, {
      limit: query?.limit,
      page: query?.page,
    });
    return plainToInstance(PaginatedResult<CountryResponseDto>, result);
  }
}
