import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { refreshTokenSchema } from './schemas/refresh-token.schema';
import { RegisterUsecase } from './use-cases/register.usecase';
import { LoginUsecase } from './use-cases/login.usecase';
import { GenerateTokenUsecase } from './use-cases/generate-token.usecase';
import { RefreshTokenUsecase } from './use-cases/refresh-token.usecase';
import { ModelNames } from '../common/data-access/model-names.enum';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow('jwtSecret'),
          signOptions: { expiresIn: configService.getOrThrow('expiresIn') },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: ModelNames.REFRESH_TOKENS, schema: refreshTokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RegisterUsecase,
    LoginUsecase,
    GenerateTokenUsecase,
    RefreshTokenUsecase,
    RefreshTokenRepository,
  ],
})
export class AuthModule {}
