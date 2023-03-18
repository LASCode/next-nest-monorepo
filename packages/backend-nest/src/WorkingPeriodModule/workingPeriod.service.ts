import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WorkingPeriod, WorkingPeriodDocument } from "./workingPeriod.schema";
import mongoose, {Model, mongo, Types} from 'mongoose';
import { UserService } from "UserModule";
import {DTO_CreateWorkingPeriod, DTO_GetWorkingPeriods} from "./dto";
import {getSlicedTimestamp} from "_Common/Utils";
import {OnEvent} from "@nestjs/event-emitter";
import {EVENT_PROJECT_CREATED, ProjectCreatedEvent, ProjectCreatedEventPayload} from "../_Common/Events";
import {EVENT_TIME_ENTRY_CREATED, TimeEntryCreatedEvent} from "../_Common/Events/timeEntry.events";

@Injectable()
export class WorkingPeriodService {
    constructor(
        @InjectModel(WorkingPeriod.name) private readonly workingPeriodModel: Model<WorkingPeriodDocument>,
        private readonly userService: UserService,
    ) {}

    @OnEvent(EVENT_PROJECT_CREATED)
    async handleProjectCreated({ eventPayload }: ProjectCreatedEvent) {
        const { working_period_id, project_id } = eventPayload;
        await this.workingPeriodModel.findByIdAndUpdate(working_period_id, {
            $push: { assignedProjects: project_id }
        });
    }
    @OnEvent(EVENT_TIME_ENTRY_CREATED)
    async handleTimeEntryCreated({ eventPayload }: TimeEntryCreatedEvent) {
        const { working_period_id, time_entry_id } = eventPayload;
        await this.workingPeriodModel.findByIdAndUpdate(working_period_id, {
            $push: { assignedTimeEntries: time_entry_id }
        });
    }


    async createWorkingPeriod(payload: DTO_CreateWorkingPeriod) {
        const timestamp = getSlicedTimestamp(payload.assignedDay);
        const users = await this.userService.getUsers();
        const currentUser = users.find((user) => user.id === payload.user_id);
        if (!currentUser) throw new HttpException('Пользователь не существует', HttpStatus.UNAUTHORIZED);
        const alreadyCreated = await this.workingPeriodModel.findOne({assignedDay: timestamp});
        console.log(alreadyCreated)
        if (alreadyCreated) throw new HttpException('Рабочий период для этого дня уже существует', HttpStatus.BAD_REQUEST);

        const newWorkingPeriod = await this.create({
            createdBy: currentUser.id,
            createdTime: new Date().getTime(),
            assignedDay: timestamp,
            assignedProjects: [],
            assignedTimeEntries: [],
        });
        return newWorkingPeriod.save();
    }
    async getWorkingPeriods(payload: DTO_GetWorkingPeriods) {
        return this.workingPeriodModel.find({createdBy: payload.user_id});
    }

    private async create(payload: WorkingPeriod) {
        return await (await this.workingPeriodModel.create(payload)).save();
    }
    async findById(id: string) {
        return this.workingPeriodModel.findById(id);
    }
}