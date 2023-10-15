import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Doctor {
  @Prop({ required: true })
  slotId: string;
  @Prop()
  name: string;
}

export type DoctorDocument = Doctor & mongoose.Document;
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
