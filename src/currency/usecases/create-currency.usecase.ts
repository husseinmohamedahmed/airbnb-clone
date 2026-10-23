import { Injectable } from '@nestjs/common';
import { CurrencyRepository } from '../repository/currency.repository';
import { CurrencyResponseDto } from '../dtos/currency-response.dto';
import { CreateCurrencyDto } from '../dtos/create-currency.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateCurrencyUsecase {
  constructor(private readonly currencyRepository: CurrencyRepository) {}
  async execute(body: CreateCurrencyDto): Promise<CurrencyResponseDto> {
    const existedCurrencyName = await this.currencyRepository.findOne({
      name: body.name,
      isDeleted: false,
    });
    if (existedCurrencyName) {
      throw new BadRequestException('Currency name already  exists');
    }
    const existedCurrencyCode = await this.currencyRepository.findOne({
      currencyCode: body.currencyCode,
      isDeleted: false,
    });
    if (existedCurrencyCode) {
      throw new BadRequestException('Currency code already  exists');
    }
    const currency = await this.currencyRepository.create(body);
    return plainToInstance(CurrencyResponseDto, currency.toObject());
  }
}
