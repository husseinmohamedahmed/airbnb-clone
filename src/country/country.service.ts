import { Injectable } from '@nestjs/common';
import { CreateCountryUseCase } from './usecases/create-country.usecase';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CountryRequestDto } from './dtos/country-request.dto';
import { GetCountryByIdUseCase } from './usecases/get-country-by-id-usecase';
import { GetAllCountriesUseCase } from './usecases/get-all-countries.usecase';
import { SoftDeleteCountryByIdUseCase } from './usecases/soft-delete-country-by-id-usecase';
import { UpdateCountryByIdUseCase } from './usecases/update-country-by-id-usecase';
import { CountryUpdateDto } from './dtos/country-update.dto';
import { CountryFilterDto } from './dtos/country-filter.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
@Injectable()
export class CountryService {
  constructor(
    private readonly createCountryUseCase: CreateCountryUseCase,
    private readonly getCountryByIdUseCase: GetCountryByIdUseCase,
    private readonly getAllCountriesUseCase: GetAllCountriesUseCase,
    private readonly softDeleteCountryByIdUseCase: SoftDeleteCountryByIdUseCase,
    private readonly updateCountryByIdUseCase: UpdateCountryByIdUseCase,
  ) {}
  async createCountry(body: CountryRequestDto): Promise<CountryResponseDto> {
    return this.createCountryUseCase.execute(body);
  }
  async getCountryById(id: string): Promise<CountryResponseDto> {
    return this.getCountryByIdUseCase.execute(id);
  }
  async getAllCountries(
    query: CountryFilterDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.getAllCountriesUseCase.execute(query);
  }
  async softDeleteCountryById(id: string): Promise<void> {
    return this.softDeleteCountryByIdUseCase.execute(id);
  }
  async updateCountryById(
    id: string,
    body: CountryUpdateDto,
  ): Promise<CountryResponseDto> {
    return this.updateCountryByIdUseCase.execute(id, body);
  }
}
