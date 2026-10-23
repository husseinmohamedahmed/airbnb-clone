import { Injectable } from '@nestjs/common';
import { CountryUpdateDto } from '../dtos/country-update.dto';
import { CountryResponseDto } from '../dtos/country-response.dto';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';
import { CountryRepository } from '../repository/country.repository';
@Injectable()
export class UpdateCountryByIdUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}
  async execute(
    id: string,
    body: CountryUpdateDto,
  ): Promise<CountryResponseDto> {
    const existingCountry = await this.countryRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!existingCountry) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }
    if (body.name) {
      const countryWithSameName = await this.countryRepository.findOne({
        name: body.name,
        _id: { $ne: id },
      });
      if (countryWithSameName) {
        throw new BadRequestException(
          `Country with name ${body.name} already exists`,
        );
      }
    }
    if (body.countryCode) {
      const countryWithSameCode = await this.countryRepository.findOne({
        countryCode: body.countryCode,
        _id: { $ne: id },
      });
      if (countryWithSameCode) {
        throw new BadRequestException(
          `Country with code ${body.countryCode} already exists`,
        );
      }
    }
    const updatedCountry = await this.countryRepository.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
      },
    );
    return plainToInstance(CountryResponseDto, updatedCountry!.toObject());
  }
}
