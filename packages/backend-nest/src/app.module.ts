import { AppEnv } from 'constants/AppEnv';
import { Module } from '@nestjs/common';
import { ProjectModule } from './ProjectModule/project.module';
import { MongooseModule } from '@nestjs/mongoose';
import {WorkingPeriodModule} from "./WorkingPeriodModule/workingPeriod.module";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {UserModule} from "./UserModule";
import {TimeEntryModule} from "./TimeEntryModule/timeEntry.module";

@Module({
  imports: [
      MongooseModule.forRoot(AppEnv.MONGODB_LINK),
      EventEmitterModule.forRoot(),
      WorkingPeriodModule,
      ProjectModule,
      UserModule,
      TimeEntryModule
  ],
})
export class AppModule {}
