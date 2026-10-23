import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/data-access/base-repository';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(ModelNames.USERS) private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
