import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from "mongoose";
import { Project } from "ProjectModule/project.schema";
import {TimeEntry} from "../TimeEntryModule/timeEntry.schema";

@Schema({ _id: true, versionKey: false })
export class WorkingPeriod {
  @Prop({ required: true })
  createdBy: string;
  @Prop({ required: true })
  createdTime: number;
  @Prop({ required: true })
  assignedDay: number;
  @Prop({required: true, type: [{type: Types.ObjectId, ref: 'Project'}]})
  assignedProjects: Types.ObjectId[];
  @Prop({required: true, type: [{type: Types.ObjectId, ref: TimeEntry.name}]})
  assignedTimeEntries: Types.ObjectId[];
}

export type WorkingPeriodDocument = WorkingPeriod & Document;
export const WorkingPeriodSchema = SchemaFactory.createForClass(WorkingPeriod);
