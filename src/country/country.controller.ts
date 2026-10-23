import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  Patch,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CountryResponseDto } from './dtos/country-response.dto';
import { CountryRequestDto } from './dtos/country-request.dto';
import { CountryService } from './country.service';
import { CountryIdDto } from './dtos/country-id.dto';
import { CountryUpdateDto } from './dtos/country-update.dto';
import { CountryFilterDto } from './dtos/country-filter.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async createCountry(
    @Body() body: CountryRequestDto,
  ): Promise<CountryResponseDto> {
    return this.countryService.createCountry(body);
  }

  @Get(':id')
  async getCountryById(
    @Param() param: CountryIdDto,
  ): Promise<CountryResponseDto> {
    return this.countryService.getCountryById(param.id);
  }

  @Get()
  async getAllCountries(
    @Query() query: CountryFilterDto,
  ): Promise<PaginatedResult<CountryResponseDto>> {
    return this.countryService.getAllCountries(query);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDeleteCountryById(@Param() param: CountryIdDto): Promise<void> {
    return this.countryService.softDeleteCountryById(param.id);
  }

  @Patch(':id')
  async updateCountryById(
    @Param() param: CountryIdDto,
    @Body() body: CountryUpdateDto,
  ): Promise<CountryResponseDto> {
    return this.countryService.updateCountryById(param.id, body);
  }
}
