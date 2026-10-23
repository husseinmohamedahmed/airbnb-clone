import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelNames } from '../../common/data-access/model-names.enum';

@Schema({ timestamps: true })
export class City {
  @Prop({ isRequired: true })
  name: string;

  @Prop({ isRequired: true, ref: ModelNames.COUNTRIES })
  country: string;
  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const citySchema = SchemaFactory.createForClass(City);
