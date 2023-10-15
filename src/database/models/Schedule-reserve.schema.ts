import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class ScheduleReserve {
  @Prop({ unique: true })
  reserveId: string;

  @Prop()
  slotId: string;

  @Prop({ default: Date.now })
  scheduledTime: Date;
}

export type ScheduleReserveDocument = ScheduleReserve & mongoose.Document;
export const ScheduleReserveSchema = SchemaFactory.createForClass(ScheduleReserve);
