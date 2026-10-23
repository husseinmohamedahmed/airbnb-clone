import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { UpdateCityDto } from '../dtos/update-city.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { CountryService } from '../../country/country.service';
import { plainToInstance } from 'class-transformer';
import { CityResponseDto } from '../dtos/city-response.dto';

@Injectable()
export class UpdateCityUsecase {
  constructor(
    private readonly cityRepository: CityRepository,
    private readonly countryService: CountryService,
  ) {}
  async execute(id: string, body: UpdateCityDto): Promise<CityResponseDto> {
    const city = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!city) {
      throw new NotFoundException('City is not found');
    }
    if (body.name) {
      const existedCityName = await this.cityRepository.findOne({
        name: body.name,
        _id: { $ne: id },
        country: city.country,
      });
      if (existedCityName)
        throw new BadRequestException('City name already exists');
    }
    if (body.country) {
      await this.countryService.getCountryById(body.country);
    }
    const updatedCity = await this.cityRepository.findByIdAndUpdate(id, body);
    return plainToInstance(CityResponseDto, updatedCity?.toObject());
  }
}
