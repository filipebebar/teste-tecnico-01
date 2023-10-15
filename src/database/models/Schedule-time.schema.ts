import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class ScheduleTime {
  @Prop({ required: true })
  slotId: string;

  @Prop({ default: 3 })
  minutes: number;
}

export type ScheduleTimeDocument = ScheduleTime & mongoose.Document;
export const ScheduleTimeSchema = SchemaFactory.createForClass(ScheduleTime);

ScheduleTimeSchema.pre('save', function (next) {
  if (this.isModified('minutes')) {
    if (typeof this.minutes !== 'number' || !Number.isInteger(this.minutes)) {
      return next(new Error('Minutes must be an integer.'));
    }

    if (this.minutes < 0 || this.minutes > 59) {
      return next(new Error('Minutes must be between 0 and 59.'));
    }
  }

  next();
});
