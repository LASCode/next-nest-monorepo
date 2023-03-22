import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Project, ProjectSchema} from "./project.schema";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {UserModule} from "../UserModule";
import {WorkingPeriodModule} from "../WorkingPeriodModule/workingPeriod.module";
import {TimeEntryModule} from "../TimeEntryModule/timeEntry.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}]),
      EventEmitterModule.forRoot(),
      UserModule,
      WorkingPeriodModule,
      TimeEntryModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
