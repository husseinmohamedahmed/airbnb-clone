import { Injectable } from '@nestjs/common';
import { UnitCategoryRepository } from '../repository/unit-category.repository';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';

@Injectable()
export class SoftDeleteUnitCategoryUsecase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const existedUnitCategory = await this.unitCategoryRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!existedUnitCategory) {
      throw new NotFoundException('Unit category is not found');
    }
    await this.unitCategoryRepository.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: Date.now(),
    });
    return;
  }
}
