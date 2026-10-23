import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../repository/currency.repository';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';

@Injectable()
export class SoftDeleteCurrencyUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}
  async execute(id: string): Promise<void> {
    const existedCurrency = await this.currencyRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!existedCurrency) {
      throw new NotFoundException('Currency is not found');
    }
    await this.currencyRepository.findByIdAndUpdate(id, {
      isDeleted: true,
      deletedAt: Date.now(),
    });
    return;
  }
}
