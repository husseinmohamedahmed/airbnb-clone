import {
  Body,
  Controller,
  Post,
  Query,
  Get,
  HttpCode,
  Delete,
  Param,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import { CreateCityDto } from './dtos/create-city.dto';
import { CitiesService } from './cities.service';
import { FindAllCitiesDto } from './dtos/find-all-cities.dto';
import { CityResponseDto } from './dtos/city-response.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { UpdateCityDto } from './dtos/update-city.dto';
@Controller('city')
export class CitiesController {
  constructor(private readonly cityService: CitiesService) {}

  @Post()
  async createCity(@Body() body: CreateCityDto): Promise<CityResponseDto> {
    return this.cityService.createCity(body);
  }

  @Get()
  async findAllCities(
    @Query() query: FindAllCitiesDto,
  ): Promise<PaginatedResult<CityResponseDto>> {
    return this.cityService.findAllCities(query);
  }

  @Get(':id')
  async FindCityById(@Param('id') id: string): Promise<CityResponseDto> {
    return this.cityService.findCityById(id);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDeleteCity(@Param('id') id: string): Promise<void> {
    return this.cityService.softDeleteCity(id);
  }
  @Patch(':id')
  async updateCity(
    @Param('id') id: string,
    @Body() body: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return this.cityService.updateCity(id, body);
  }
}
