import { Injectable } from '@nestjs/common';
import {DTO_CreateProject} from "./dto/createProject.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Project, ProjectDocument} from "./project.schema";
import {EventEmitter2, OnEvent} from "@nestjs/event-emitter";
import {EVENT_PROJECT_CREATED, ProjectCreatedEvent} from "../_Common/Events";
import {WorkingPeriodService} from "../WorkingPeriodModule/workingPeriod.service";
import {checkDocument} from "../_Common/Utils/checkDocument";
import {EVENT_TIME_ENTRY_CREATED, TimeEntryCreatedEvent} from "../_Common/Events/timeEntry.events";

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>,
        private readonly eventEmitter: EventEmitter2,
        private readonly workingPeriodService: WorkingPeriodService,
    ) {}

    @OnEvent(EVENT_TIME_ENTRY_CREATED)
    async handleTimeEntryCreated({ eventPayload }: TimeEntryCreatedEvent) {
        const { project_id, time_entry_id } = eventPayload;
        await this.projectModel.findByIdAndUpdate(project_id, {
            $push: { assignedTimeEntries: time_entry_id }
        });
    }

    async createProject(payload: DTO_CreateProject) {
        const { working_period_id } = payload;
        const workingPeriod = await checkDocument(this.workingPeriodService)(working_period_id, 'test');

        const newProject = await this.create({
            title: payload.name,
            createdTime: new Date().getTime(),
            assignedWorkingPeriod: workingPeriod._id,
            assignedTimeEntries: [],
        });

        this.eventEmitter.emit(
            EVENT_PROJECT_CREATED,
            new ProjectCreatedEvent({
                project_id: newProject._id,
                working_period_id: workingPeriod._id,
            }),
        )

        return newProject;
    }

    async create(payload: Project): Promise<ProjectDocument> {
        return await (await this.projectModel.create(payload)).save();
    }
    async findById(id: string) {
        return this.projectModel.findById(id);
    }
}
