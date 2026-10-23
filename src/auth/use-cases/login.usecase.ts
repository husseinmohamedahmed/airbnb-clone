import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { BadRequestException } from '../../common/errors-handling/custom-exceptions/bad-request.exception';
import bcrypt from 'bcryptjs';
import { UsersService } from '../../users/users.service';
import { GenerateTokenUsecase } from './generate-token.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoginUsecase {
  constructor(
    private readonly userService: UsersService,
    private readonly generateTokenUsecase: GenerateTokenUsecase,
  ) {}
  async execute(body: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.findOne({ email: body.email });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const passwordChecked = await bcrypt.compare(body.password, user.password);
    if (passwordChecked == false) {
      throw new BadRequestException('Invalid credentials');
    }
    const { accessToken, refreshToken } =
      await this.generateTokenUsecase.execute(user._id.toString());
    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
