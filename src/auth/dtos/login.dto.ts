import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'User email', example: 'hussein1234@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({ description: 'User password', example: 'Password123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
