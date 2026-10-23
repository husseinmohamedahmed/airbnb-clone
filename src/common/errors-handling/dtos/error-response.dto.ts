import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorItemDto {
  @ApiProperty({ example: 'phoneNumber should not be empty' })
  message: string;

  @ApiPropertyOptional({ example: 'phoneNumber' })
  field?: string;
}

export class ErrorResponseDto {
  @ApiProperty({ type: [ErrorItemDto] })
  errors: ErrorItemDto[];
}
