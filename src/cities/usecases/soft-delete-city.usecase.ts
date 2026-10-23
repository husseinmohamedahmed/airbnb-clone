import { Injectable } from '@nestjs/common';
import { CityRepository } from '../repository/city.repository';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';

@Injectable()
export class SoftDeleteCityUsecase {
  constructor(private readonly cityRepository: CityRepository) {}
  async execute(id: string): Promise<void> {
    const city = await this.cityRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!city) {
      throw new NotFoundException('City is not found');
    }
    await this.cityRepository.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });
    return;
  }
}
