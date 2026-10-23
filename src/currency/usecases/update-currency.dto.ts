import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../repository/currency.repository';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { NotFoundException } from '../../common/errors-handling/custom-exceptions/not-found.exception';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { UpdateCurrencyDto } from '../dtos/update-currency.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UpdateCurrencyUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async execute(
    id: string,
    body: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    const currency = await this.currencyRepository.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!currency) {
      throw new NotFoundException("Currency doesn't exists");
    }
    if (body?.name) {
      const existedCurrencyName = await this.currencyRepository.findOne({
        name: body.name,
        _id: { $ne: id },
      });
      if (existedCurrencyName)
        throw new BadRequestException('Currency name already exists');
    }
    if (body?.currencyCode) {
      const existedCurrencyCode = await this.currencyRepository.findOne({
        _id: { $ne: id },
        currencyCode: body.currencyCode,
      });
      if (existedCurrencyCode) {
        throw new BadRequestException('Currency code already exists');
      }
    }
    const updatedCurrency = await this.currencyRepository.findByIdAndUpdate(
      id,
      body,
    );
    return plainToInstance(CurrencyResponseDto, updatedCurrency?.toObject());
  }
}
