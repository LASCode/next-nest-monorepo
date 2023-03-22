import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: true, versionKey: false })
export class TimeEntry {
  @Prop({ required: true })
  start: number;
  @Prop({ default: null })
  end: number | null;
}

export type TimeEntryDocument = TimeEntry & Document;
export const TimeEntrySchema = SchemaFactory.createForClass(TimeEntry);
