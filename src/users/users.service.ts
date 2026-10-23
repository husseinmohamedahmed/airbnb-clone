import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryFilter } from 'mongoose';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserUsecase } from './use-cases/create-user.usecase';
import { FindUserUsecase } from './use-cases/find-user.usecase';

@Injectable()
export class UsersService {
  constructor(
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly findUserUsecase: FindUserUsecase,
  ) {}
  async create(body: CreateUserDto): Promise<UserResponseDto> {
    return this.createUserUsecase.exec(body);
  }

  async findOne(query: QueryFilter<User>) {
    return this.findUserUsecase.exec(query);
  }
}
