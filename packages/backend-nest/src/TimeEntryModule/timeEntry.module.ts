import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {UserModule} from "../UserModule";
import {TimeEntry, TimeEntrySchema} from "./timeEntry.schema";
import {TimeEntryController} from "./timeEntry.controller";
import {TimeEntryService} from "./timeEntry.service";
import {ProjectModule} from "../ProjectModule/project.module";
import {WorkingPeriodModule} from "../WorkingPeriodModule/workingPeriod.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: TimeEntry.name, schema: TimeEntrySchema}]),
      EventEmitterModule.forRoot(),
      UserModule,
      ProjectModule,
      WorkingPeriodModule,
  ],
  controllers: [TimeEntryController],
  providers: [TimeEntryService],
})
export class TimeEntryModule {}
