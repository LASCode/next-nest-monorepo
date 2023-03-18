import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkingPeriod, WorkingPeriodSchema } from './workingPeriod.schema';
import {WorkingPeriodController} from "./workingPeriod.controller";
import {WorkingPeriodService} from "./workingPeriod.service";
import {UserModule} from "../UserModule";
import {EventEmitterModule} from "@nestjs/event-emitter";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WorkingPeriod.name, schema: WorkingPeriodSchema }]),
    EventEmitterModule.forRoot(),
    UserModule,
  ],
  controllers: [WorkingPeriodController],
  providers: [WorkingPeriodService],
  exports: [WorkingPeriodService]
})
export class WorkingPeriodModule {}
