import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class RefreshToken {
  @Prop({ isRequired: true })
  userId: string;
  @Prop({ isRequired: true })
  refreshToken: string;
}

export const refreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
