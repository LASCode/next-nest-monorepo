import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {TimeEntry, TimeEntrySchema} from "./timeEntry.schema";
import {TimeEntryController} from "./timeEntry.controller";
import {TimeEntryService} from "./timeEntry.service";

@Module({
  imports: [
      MongooseModule.forFeature([{name: TimeEntry.name, schema: TimeEntrySchema}]),
  ],
  controllers: [TimeEntryController],
  providers: [TimeEntryService],
  exports: [TimeEntryService]
})
export class TimeEntryModule {}
