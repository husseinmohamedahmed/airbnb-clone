import { Injectable } from '@nestjs/common';
import { CreateUnitCategoryUsecase } from './usecases/create-unit-category.usecase';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { FindAllUnitCategoriesUsecase } from './usecases/find-all-unit-category.usecase';
import { FindAllUnitCategoryDto } from './dtos/find-all-unit-category.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { FindUnitCategoryByIdUsecase } from './usecases/find-unit-cateogry-by-id';
import { UpdateUnitCategoryUsecase } from './usecases/update-unit-category.dto';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';
import { SoftDeleteUnitCategoryUsecase } from './usecases/soft-delete-unit-category.usecase';

@Injectable()
export class UnitCategoryService {
  constructor(
    private readonly createUnitCategoryUsecase: CreateUnitCategoryUsecase,
    private readonly findAllUnitCategoriesUsecase: FindAllUnitCategoriesUsecase,
    private readonly findUnitCategoryByIdUsecase: FindUnitCategoryByIdUsecase,
    private readonly updateUnitCategoryUsecase: UpdateUnitCategoryUsecase,
    private readonly softDeleteUnitCategoryUsecase: SoftDeleteUnitCategoryUsecase,
  ) {}
  async createUnitCategory(
    body: CreateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.createUnitCategoryUsecase.execute(body);
  }
  async findAllUnitCategories(
    query: FindAllUnitCategoryDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.findAllUnitCategoriesUsecase.execute(query);
  }
  async findUnitCategoryById(id: string): Promise<UnitCategoryResponseDto> {
    return this.findUnitCategoryByIdUsecase.execute(id);
  }
  async updateUnitCategory(
    id: string,
    body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.updateUnitCategoryUsecase.execute(id, body);
  }
  async softDeleteUnitCategory(id: string): Promise<void> {
    return this.softDeleteUnitCategoryUsecase.execute(id);
  }
}
