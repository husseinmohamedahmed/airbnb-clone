import { Injectable } from '@nestjs/common';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { plainToInstance } from 'class-transformer';
import { CountryRepository } from '../repository/country.repository';
@Injectable()
export class GetCountryByIdUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}
  async execute(id: string): Promise<CountryResponseDto> {
    const country = await this.countryRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
    return plainToInstance(CountryResponseDto, country.toObject());
  }
}
