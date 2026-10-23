import { Injectable } from '@nestjs/common';
import { UnitCategoryRepository } from '../repository/unit-category.repository';
import { PaginatedResult } from '../../common/data-access/base-repository';
import { UnitCategoryResponseDto } from '../dtos/unit-category-response.dto';
import { QueryFilter } from 'mongoose';
import { UnitCategory } from '../schemas/unit-category-schema';
import { FindAllUnitCategoryDto } from '../dtos/find-all-unit-category.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAllUnitCategoriesUsecase {
  constructor(
    private readonly unitCategoryRepository: UnitCategoryRepository,
  ) {}
  async execute(
    query: FindAllUnitCategoryDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    const matchQuery: QueryFilter<UnitCategory> = { isDeleted: false };
    if (query?.name) {
      matchQuery.name = { $regex: query.name, $options: 'i' };
    }
    if (query?.icon) {
      matchQuery.icon = query.icon;
    }
    const result: PaginatedResult<UnitCategory> =
      await this.unitCategoryRepository.findPaginated(matchQuery, {
        limit: query?.limit,
        page: query?.page,
      });
    return plainToInstance(PaginatedResult<UnitCategoryResponseDto>, result);
  }
}
