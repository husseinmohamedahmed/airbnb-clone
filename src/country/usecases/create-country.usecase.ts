import { Injectable } from '@nestjs/common';
import { CountryRequestDto } from '../dtos/country-request.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { plainToInstance } from 'class-transformer';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { CountryRepository } from '../repository/country.repository';
@Injectable()
export class CreateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}
  async execute(body: CountryRequestDto): Promise<CountryResponseDto> {
    const existedCountryName = await this.countryRepository.findOne({
      name: body.name,
      isDeleted: false,
    });
    if (existedCountryName) {
      throw new BadRequestException('Country already exists');
    }
    const existedCountryCode = await this.countryRepository.findOne({
      countryCode: body?.countryCode,
      isDeleted: false,
    });
    if (existedCountryCode) {
      throw new BadRequestException('Country already exists');
    }
    const country = await this.countryRepository.create(body);
    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
