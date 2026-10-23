import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class AppSettings {
  @Prop({ isRequired: true, min: 0, max: 25, default: 0 })
  vatRate: number;
  @Prop({ isRequired: true, min: 0, default: 0 })
  minPrice: number;
}

export const appSettingsSchema = SchemaFactory.createForClass(AppSettings);
