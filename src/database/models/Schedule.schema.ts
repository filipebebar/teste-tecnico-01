import { DoctorDocument, DoctorSchema } from './Doctor.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UnitDocument, UnitSchema } from './Unit.schema';
import { SpecialityDocument, SpecialitySchema } from './Speciality.schema';

@Schema()
export class Schedule {
  @Prop({ unique: true })
  slotId: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: false })
  reserved: boolean;

  @Prop({ type: SpecialitySchema })
  speciality: SpecialityDocument;

  @Prop({ type: UnitSchema })
  unit: UnitDocument;

  @Prop({ type: DoctorSchema })
  doctor: DoctorDocument;

  @Prop()
  lastAppointment: Date;
}

export type ScheduleDocument = Schedule & mongoose.Document;
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
