import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'User name',
    example: 'Hussein Mohamed',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    description: 'User email',
    example: 'hussein1234@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'User password',
    example: 'Password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty({
    description: 'User phone number',
    example: '01234567899',
  })
  @IsNotEmpty()
  phoneNumber: string;
}
