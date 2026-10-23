import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { plainToInstance } from 'class-transformer';
import { RefreshTokenRepository } from '../repository/refresh-token.repository';

@Injectable()
export class GenerateTokenUsecase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly configService: ConfigService,
  ) {}
  async execute(userId: string): Promise<AuthResponseDto> {
    const accessToken = await this.jwtService.signAsync({ userId });
    const refreshToken = await this.jwtService.signAsync(
      { userId, type: 'refreshToken' },
      { expiresIn: this.configService.getOrThrow('refreshTokenExpiration') },
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.refreshTokenRepository.findOneAndUpdate(
      { userId },
      { refreshToken: hashedRefreshToken },
      { new: true, upsert: true },
    );
    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
