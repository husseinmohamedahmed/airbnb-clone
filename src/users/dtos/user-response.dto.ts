import { Injectable } from '@nestjs/common';
import { Exclude, Expose } from 'class-transformer';

@Injectable()
export class UserResponseDto {
  @Expose()
  _id: string;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Exclude()
  password: string;
  @Expose()
  phoneNumber: string;
}
