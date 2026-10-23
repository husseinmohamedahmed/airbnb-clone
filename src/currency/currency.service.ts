import { Injectable } from '@nestjs/common';
import { CreateCurrencyUsecase } from './usecases/create-currency.usecase';
import { CreateCurrencyDto } from './dtos/create-currency.dto';
import { CurrencyResponseDto } from './dtos/currency-response.dto';
import { FindAllCurrenciesUsecase } from './usecases/find-all-currencies.usecase';
import { FindAllCurrenciesDto } from './dtos/find-all-currencies.dto';
import { PaginatedResult } from '../common/data-access/base-repository';
import { FindCurrencyByIdUsecase } from './usecases/find-currency-by-id';
import { UpdateCurrencyUsecase } from './usecases/update-currency.dto';
import { UpdateCurrencyDto } from './dtos/update-currency.dto';
import { SoftDeleteCurrencyUsecase } from './usecases/soft-delete-currency.usecase';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly createCurrencyUsecase: CreateCurrencyUsecase,
    private readonly findAllCurrenciesUsecase: FindAllCurrenciesUsecase,
    private readonly findCurrencyByIdUsecase: FindCurrencyByIdUsecase,
    private readonly updateCurrencyUsecase: UpdateCurrencyUsecase,
    private readonly softDeleteCurrencyUsecase: SoftDeleteCurrencyUsecase,
  ) {}
  async createCurrency(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    return this.createCurrencyUsecase.execute(body);
  }
  async findAllCurrencies(
    query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    return this.findAllCurrenciesUsecase.execute(query);
  }
  async findCurrencyById(id: string): Promise<CurrencyResponseDto> {
    return this.findCurrencyByIdUsecase.execute(id);
  }
  async updateCurrency(
    id: string,
    body: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.updateCurrencyUsecase.execute(id, body);
  }
  async softDeleteCurrency(id: string): Promise<void> {
    return this.softDeleteCurrencyUsecase.execute(id);
  }
}
