import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Country {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ default: null })
  countryCode: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const countrySchema = SchemaFactory.createForClass(Country);
