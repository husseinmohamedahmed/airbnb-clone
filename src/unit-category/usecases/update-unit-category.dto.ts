import { Injectable } from '@nestjs/common';
import { UnitCategoryRepository } from '../repository/unit-category.repository';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { UpdateUnitCategoryDto } from '../dtos/update-unit-category.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateUnitCategoryUsecase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
  ) {}

  async execute(
    id: string,
    body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    const unitCategory = await this.unitCategoryRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!unitCategory) {
      throw new NotFoundException("Unit category doesn't exist");
    }
    if (body?.name) {
      const existedUnitCategoryName = await this.unitCategoryRepository.findOne(
        {
          name: body.name,
          _id: { $ne: id },
        },
      );
      if (existedUnitCategoryName)
        throw new BadRequestException('Unit category name already exists');
    }

    const updatedUnitCategory =
      await this.unitCategoryRepository.findByIdAndUpdate(id, body);
    return plainToInstance(
      UnitCategoryResponseDto,
      updatedUnitCategory?.toObject(),
    );
  }
}
