import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserScehma } from './schemas/user.schema';
import { CreateUserUsecase } from './use-cases/create-user.usecase';
import { FindUserUsecase } from './use-cases/find-user.usecase';
import { ModelNames } from '../common/data-access/model-names.enum';
import { UserRepository } from './repository/users.repository';

@Module({
  providers: [UsersService, CreateUserUsecase, FindUserUsecase, UserRepository],
  imports: [
    MongooseModule.forFeature([{ name: ModelNames.USERS, schema: UserScehma }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
