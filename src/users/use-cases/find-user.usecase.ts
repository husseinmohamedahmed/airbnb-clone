import { QueryFilter } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/users.repository';

@Injectable()
export class FindUserUsecase {
  constructor(private readonly userModel: UserRepository) {}
  async exec(query: QueryFilter<User>) {
    const user = await this.userModel.findOne(query);
    return user;
  }
}
