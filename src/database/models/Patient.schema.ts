import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IsDateString } from 'class-validator';

@Schema()
export class Patient {
  @Prop({ required: true })
  slotId: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  gender: string;

  @Prop()
  @IsDateString()
  birthDate: Date;
}

export type PatientDocument = Patient & mongoose.Document;
export const PatientSchema = SchemaFactory.createForClass(Patient);
