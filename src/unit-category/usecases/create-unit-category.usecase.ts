import { Injectable } from '@nestjs/common';
import { UnitCategoryRepository } from '../repository/unit-category.repository';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { CreateUnitCategoryDto } from '../dtos/create-unit-category.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateUnitCategoryUsecase {
  constructor(private readonly unitCategoryRepository: UnitCategoryRepository) {}
  async execute(body: CreateUnitCategoryDto): Promise<UnitCategoryResponseDto> {
    const existedUnitCategory = await this.unitCategoryRepository.findOne({
      name: body.name,
      isDeleted: false,
    });
    if (existedUnitCategory) {
      throw new BadRequestException('Unit category name already exists');
    }
    const unitCategory = await this.unitCategoryRepository.create(body);
    return plainToInstance(UnitCategoryResponseDto, unitCategory.toObject());
  }
}
