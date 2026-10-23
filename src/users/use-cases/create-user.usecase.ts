import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import bcrypt from 'bcryptjs';
import { UserResponseDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from '../repository/users.repository';

@Injectable()
export class CreateUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}
  async exec(body: CreateUserDto): Promise<UserResponseDto> {
    const existingUserByEmail = await this.userRepository.findOne({
      email: body.email,
    });
    if (existingUserByEmail) {
      throw new BadRequestException('Already registered user');
    }
    const existingUserByPhoneNumber = await this.userRepository.findOne({
      phoneNumber: body.phoneNumber,
    });
    if (existingUserByPhoneNumber) {
      throw new BadRequestException('Already registered user');
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.userRepository.create({
      ...body,
      password: hashedPassword,
    });
    return plainToInstance(UserResponseDto, user);
  }
}
