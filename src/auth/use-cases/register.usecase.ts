import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { ROLES } from '../../common/constants/roles.constant'
import { UsersService } from '../../users/users.service';
import { GenerateTokenUsecase } from './generate-token.usecase';
import { AuthResponseDto } from '../dtos/auth-response.dto';

@Injectable()
export class RegisterUsecase {
  constructor(
    private readonly userService: UsersService,
    private readonly generateTokenUsecase: GenerateTokenUsecase,
  ) {}
  async execute(body: RegisterDto): Promise<AuthResponseDto> {
    const createdUser = await this.userService.create(body);
    const tokens: AuthResponseDto = await this.generateTokenUsecase.execute(
      { id: createdUser._id.toString(), role: ROLES.USER },
    );
    return tokens;
  }
}
