import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Model } from 'mongoose';
import { RefreshToken } from '../schemas/refresh-token.schema';
import { BaseRepository } from '../../common/data-access/base-repository';

@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken> {
  constructor(
    @InjectModel(ModelNames.REFRESH_TOKENS)
    private readonly refreshTokenModel: Model<RefreshToken>,
  ) {
    super(refreshTokenModel);
  }
}
