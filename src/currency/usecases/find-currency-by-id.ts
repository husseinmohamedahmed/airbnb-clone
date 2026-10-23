import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../repository/currency.repository';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindCurrencyByIdUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}
  async execute(id: string): Promise<CurrencyResponseDto> {
    const currency = await this.currencyRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!currency) {
      throw new NotFoundException("Currency doesn't exist");
    }
    return plainToInstance(CurrencyResponseDto, currency.toObject());
  }
}
