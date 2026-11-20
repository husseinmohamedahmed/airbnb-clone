import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { Ipayload } from './interfaces/payload.interface';
import { LoginDto } from './dtos/login.dto';

import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { RegisterUsecase } from './use-cases/register.usecase';
import { LoginUsecase } from './use-cases/login.usecase';
import { GenerateTokenUsecase } from './use-cases/generate-token.usecase';
import { RefreshTokenUsecase } from './use-cases/refresh-token.usecase';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUsecase: RegisterUsecase,
    private readonly loginUsecase: LoginUsecase,
    private readonly generateTokenUsecase: GenerateTokenUsecase,
    private readonly refreshTokenUsecase: RefreshTokenUsecase,
  ) {}

  async register(body: RegisterDto): Promise<AuthResponseDto> {
    return this.registerUsecase.execute(body);
  }
  async login(body: LoginDto): Promise<AuthResponseDto> {
    return this.loginUsecase.execute(body);
  }
  async generateTokens(payload: Ipayload) {
    return this.generateTokenUsecase.execute(payload);
  }
  async generateRefreshToken(body: RefreshTokenDto) {
    return this.refreshTokenUsecase.execute(body);
  }
}
