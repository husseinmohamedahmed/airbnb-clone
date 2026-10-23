import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ description: 'Access token', example: 'dkckd@@dxjvckm3' })
  accessToken: string;
  @ApiProperty({ description: 'Refresh token', example: '@Wcjvjcjcxj#' })
  refreshToken: string;
}
