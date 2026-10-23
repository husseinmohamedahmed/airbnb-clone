import { Injectable } from '@nestjs/common';
import { UnitCategoryRepository } from '../repository/unit-category.repository';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindUnitCategoryByIdUsecase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
  ) {}
  async execute(id: string): Promise<UnitCategoryResponseDto> {
    const unitCategory = await this.unitCategoryRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!unitCategory) {
      throw new NotFoundException("Unit category doesn't exist");
    }
    return plainToInstance(UnitCategoryResponseDto, unitCategory.toObject());
  }
}
