import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiResponse({ status: 201, type: AuthResponseDto })
  register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(body);
  }
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refreshToken')
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.generateRefreshToken(body);
  }
}
