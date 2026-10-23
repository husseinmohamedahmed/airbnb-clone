import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../repository/currency.repository';
import { PaginatedResult } from '../../common/data-access/base-repository';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { QueryFilter } from 'mongoose';
import { Currency } from '../schemas/currency-schema';
import { FindAllCurrenciesDto } from '../dtos/find-all-currencies.dto';

@Injectable()
export class FindAllCurrenciesUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}
  async execute(
    query: FindAllCurrenciesDto,
  ): Promise<PaginatedResult<CurrencyResponseDto>> {
    const matchQuery: QueryFilter<Currency> = { isDeleted: false };
    if (query?.name) {
      matchQuery.name = { $regex: query.name, $options: 'i' };
    }
    if (query?.currencyCode) {
      matchQuery.currencyCode = query.currencyCode;
    }
    const result: PaginatedResult<Currency> =
      await this.currencyRepository.findPaginated(matchQuery, {
        limit: query?.limit,
        page: query?.page,
      });
    return result;
  }
}
