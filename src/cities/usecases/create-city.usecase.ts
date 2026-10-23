import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';
import { CreateCityDto } from '../dtos/create-city.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { CountryService } from '../../country/country.service';
import { plainToInstance } from 'class-transformer';
import { CityResponseDto } from '../dtos/city-response.dto';

@Injectable()
export class CreateCityUsecase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly countryService: CountryService,
  ) {}

  async execute(body: CreateCityDto) {
    const existedCity = await this.cityRepository.findOne({
      name: body.name,
      isDeleted: false,
      country: body.country,
    });

    if (existedCity) {
      throw new BadRequestException('City already exists');
    }
    await this.countryService.getCountryById(body.country);
    const city = await this.cityRepository.create(body);
    return plainToInstance(CityResponseDto, city.toObject());
  }
}
