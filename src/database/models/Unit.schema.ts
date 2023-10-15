import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Unit {
  @Prop({ required: true })
  slotId: string;
  @Prop()
  name: string;
}

export type UnitDocument = Unit & mongoose.Document;
export const UnitSchema = SchemaFactory.createForClass(Unit);
