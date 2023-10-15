import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Speciality {
  @Prop({ required: true })
  slotId: string;
  @Prop()
  name: string;
}

export type SpecialityDocument = Speciality & mongoose.Document;
export const SpecialitySchema = SchemaFactory.createForClass(Speciality);
