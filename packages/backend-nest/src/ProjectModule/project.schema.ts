import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { WorkingPeriod } from "WorkingPeriodModule/workingPeriod.schema";
import {TimeEntry} from "../TimeEntryModule/timeEntry.schema";

@Schema({ _id: true, versionKey: false })
export class Project {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  createdTime: number;
  @Prop({ required: true })
  isRunning: boolean;
  @Prop({type: Types.ObjectId, ref: TimeEntry.name})
  currentEntry: Types.ObjectId | null;
  @Prop({ required: true })
  totalTime: number;
  @Prop({ required: true, type: [{type: Types.ObjectId, ref: TimeEntry.name}]})
  assignedTimeEntries: Types.ObjectId[];
  @Prop({ required: true, type: Types.ObjectId, ref: WorkingPeriod.name})
  assignedWorkingPeriod: Types.ObjectId;
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
