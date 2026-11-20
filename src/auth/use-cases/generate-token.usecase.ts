import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Ipayload } from '../interfaces/payload.interface';
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
  async execute(payload:Ipayload): Promise<AuthResponseDto> {
    const accessToken = await this.jwtService.signAsync({ userId: payload.id,role:payload.role });
    const refreshToken = await this.jwtService.signAsync(
      { userId:payload.id,role:payload.role, type: 'refreshToken' },
      { expiresIn: this.configService.getOrThrow('refreshTokenExpiration') },
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.refreshTokenRepository.findOneAndUpdate(
      { userId: payload.id },
      { refreshToken: hashedRefreshToken },
      { new: true, upsert: true },
    );
    return plainToInstance(AuthResponseDto, { accessToken, refreshToken });
  }
}
