import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from '../../common/constants/roles.constant';
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
  @ApiProperty({ enum: ROLES, example: ROLES.ADMIN })
  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}
