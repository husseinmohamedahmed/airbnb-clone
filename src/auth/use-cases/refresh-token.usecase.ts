import { Injectable } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ForbiddenException } from '../../common/errors-handling/custom-exceptions/forbidden.exception';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateTokenUsecase } from './generate-token.usecase';
import { plainToInstance } from 'class-transformer';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
@Injectable()
export class RefreshTokenUsecase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly configService: ConfigService,
    private readonly generateTokenUsecase: GenerateTokenUsecase,
  ) {}
  async execute(body: RefreshTokenDto) {
    let decodedToken;
    try {
      decodedToken = await this.jwtService.verifyAsync(body.refreshToken);
      if (decodedToken.type != 'refreshToken') {
        throw new ForbiddenException('Invalid refresh token');
      }
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }

    const existedRefreshTokenDoc = await this.refreshTokenRepository.findOne({
      userId: decodedToken.userId,
    });

    if (!existedRefreshTokenDoc) {
      throw new ForbiddenException('Invalid refresh Token');
    }
    const isRefreshTokenMatched = await bcrypt.compare(
      body.refreshToken,
      existedRefreshTokenDoc.refreshToken,
    );
    if (!isRefreshTokenMatched) {
      throw new ForbiddenException('Invalid refresh token');
    }
    const { accessToken, refreshToken } =
      await this.generateTokenUsecase.execute(decodedToken.userId);
    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
