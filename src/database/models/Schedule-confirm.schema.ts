import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { PatientDocument, PatientSchema } from './Patient.schema';

@Schema()
export class ScheduleConfirm {
  @Prop({ required: true })
  reserveId: string;

  @Prop({ required: true })
  scheduleId: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: PatientSchema })
  patient: PatientDocument;
}

export type ScheduleConfirmDocument = ScheduleConfirm & mongoose.Document;
export const ScheduleConfirmSchema = SchemaFactory.createForClass(ScheduleConfirm);
