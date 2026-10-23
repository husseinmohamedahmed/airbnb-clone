import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { CityResponseDto } from '../dtos/city-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindCityByIdUsecase {
  constructor(private readonly cityRepository: CityRepository) {}
  async execute(id: string): Promise<CityResponseDto> {
    const city = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!city) {
      throw new NotFoundException('City is not found');
    }
    return plainToInstance(CityResponseDto, city.toObject());
  }
}
