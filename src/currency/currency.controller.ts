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
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { FindAllCurrenciesDto } from './dtos/find-all-currencies.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencySerivce: CurrencyService) {}
  @Post()
  async createCurrency(
    @Body() body: CreateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currencySerivce.createCurrency(body);
  }
  @Get()
  async findAllCurrencies(
    @Query() query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    return this.currencySerivce.findAllCurrencies(query);
  }
  @Patch(':id')
  async updateCurrency(
    @Param('id') id: string,
    @Body() body: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currencySerivce.updateCurrency(id, body);
  }
  @Get(':id')
  async findCurrencyById(@Param('id') id: string) {
    return this.currencySerivce.findCurrencyById(id);
  }
  @Delete(':id')
  async softDeleteCurrency(@Param('id') id: string): Promise<void> {
    return this.currencySerivce.softDeleteCurrency(id);
  }
}
