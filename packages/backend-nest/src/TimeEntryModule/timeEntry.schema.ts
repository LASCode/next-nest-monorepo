import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {Project} from "../ProjectModule/project.schema";
import {WorkingPeriod} from "../WorkingPeriodModule/workingPeriod.schema";

@Schema({ _id: true, versionKey: false })
export class TimeEntry {
  @Prop({ required: true })
  start: number;
  @Prop({ default: null })
  end: number | null;
  @Prop({required: true, type: Types.ObjectId, ref: 'Project'})
  assignedProject: Types.ObjectId;
  @Prop({required: true, type: Types.ObjectId, ref: 'WorkingPeriod'})
  assignedWorkingPeriod: Types.ObjectId;
}

export type TimeEntryDocument = TimeEntry & Document;
export const TimeEntrySchema = SchemaFactory.createForClass(TimeEntry);
