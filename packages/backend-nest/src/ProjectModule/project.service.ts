import {HttpException, Injectable} from '@nestjs/common';
import {DTO_CreateProject} from "./dto/createProject.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Project, ProjectDocument} from "./project.schema";
import {EventEmitter2, OnEvent} from "@nestjs/event-emitter";
import {EVENT_PROJECT_CREATED, ProjectCreatedEvent} from "../_Common/Events";
import {WorkingPeriodService} from "../WorkingPeriodModule/workingPeriod.service";
import {checkDocument} from "../_Common/Utils/checkDocument";
import {EVENT_TIME_ENTRY_CREATED, TimeEntryCreatedEvent} from "../_Common/Events/timeEntry.events";
import {DTO_StartProjectTime} from "./dto/startProjectTime.dto";
import {TimeEntryService} from "../TimeEntryModule/timeEntry.service";

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>,
        private readonly eventEmitter: EventEmitter2,
        private readonly workingPeriodService: WorkingPeriodService,
        private readonly timeEntryService: TimeEntryService,
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
            createdTime: Date.now(),
            isRunning: false,
            totalTime: 0,
            currentEntry: null,
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

    async startTimer(payload: DTO_StartProjectTime) {
        const { project_id } = payload;
        const project = await checkDocument<ProjectDocument>(this.projectModel)(project_id, 'test');
        if (project.isRunning) throw new HttpException('Уже запущено', 504);
        const newTimeEntry = await this.timeEntryService.createTimeEntry();
        console.log(newTimeEntry)
        const updatedProject = await this.projectModel.findByIdAndUpdate(project_id, {
            $push: {assignedTimeEntries: {$each: [newTimeEntry._id], $position: 0}},
            isRunning: true,
            currentEntry: newTimeEntry._id,
        }, {new: true})
        return updatedProject.populate(['assignedTimeEntries']);
    }
    async stopTimer(payload: DTO_StartProjectTime) {
        const { project_id } = payload;
        const project = await checkDocument<ProjectDocument>(this.projectModel)(project_id, 'test');
        if (!project.isRunning) throw new HttpException('Еще не запущено', 504);
        // if (!project.currentEntry) throw new HttpException('Еще не запущено', 504);
        if (!project.assignedTimeEntries.length) throw new HttpException('Нет отрезков времени', 504);
        await this.timeEntryService.updateOne(
            {_id: project.currentEntry},
            {end: Date.now()},
        );
        const timeEntry = await this.timeEntryService.findById(project.currentEntry);
        return this.projectModel.findByIdAndUpdate(
            project_id,
            {
                isRunning: false,
                currentEntry: null,
                $inc: { totalTime: timeEntry.end - timeEntry.start }
            },
            { new: true }
        ).populate(['assignedTimeEntries']);
    }

    async create(payload: Project): Promise<ProjectDocument> {
        return await (await this.projectModel.create(payload)).save();
    }
    async findById(id: string) {
        return this.projectModel.findById(id);
    }
}
