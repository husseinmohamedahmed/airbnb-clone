import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnitCategoryService } from './unit-category.service';
import { CreateUnitCategoryDto } from './dtos/create-unit-category.dto';
import { UnitCategoryResponseDto } from './dtos/unit-category-response.dto';
import { FindAllUnitCategoryDto } from './dtos/find-all-unit-category.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { UpdateUnitCategoryDto } from './dtos/update-unit-category.dto';

@Controller('unit-category')
export class UnitCategoryController {
  constructor(private readonly unitCategoryService: UnitCategoryService) {}
  @Post()
  async createUnitCategory(
    @Body() body: CreateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoryService.createUnitCategory(body);
  }
  @Get()
  async findAllUnitCategories(
    @Query() query: FindAllUnitCategoryDto,
  ): Promise<PaginatedResult<UnitCategoryResponseDto>> {
    return this.unitCategoryService.findAllUnitCategories(query);
  }
  @Patch(':id')
  async updateUnitCategory(
    @Param('id') id: string,
    @Body() body: UpdateUnitCategoryDto,
  ): Promise<UnitCategoryResponseDto> {
    return this.unitCategoryService.updateUnitCategory(id, body);
  }
  @Get(':id')
  async findUnitCategoryById(@Param('id') id: string) {
    return this.unitCategoryService.findUnitCategoryById(id);
  }
  @Delete(':id')
  async softDeleteUnitCategory(@Param('id') id: string): Promise<void> {
    return this.unitCategoryService.softDeleteUnitCategory(id);
  }
}
