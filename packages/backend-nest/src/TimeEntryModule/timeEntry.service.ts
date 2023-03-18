import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Project} from "../ProjectModule/project.schema";
import {Model} from "mongoose";
import {EventEmitter2} from "@nestjs/event-emitter";
import {checkDocument} from "../_Common/Utils/checkDocument";
import {TimeEntry, TimeEntryDocument} from "./timeEntry.schema";
import {ProjectService} from "../ProjectModule/project.service";
import {DTO_CreateTimeEntry} from "./dto/createTimeEntry.dto";
import {WorkingPeriodService} from "../WorkingPeriodModule/workingPeriod.service";
import {EVENT_TIME_ENTRY_CREATED, TimeEntryCreatedEvent} from "../_Common/Events/timeEntry.events";

@Injectable()
export class TimeEntryService {
    constructor(
        @InjectModel(TimeEntry.name) private readonly model: Model<TimeEntryDocument>,
        private readonly eventEmitter: EventEmitter2,
        private readonly workingPeriodService: WorkingPeriodService,
        private readonly projectService: ProjectService,
    ) {}

    async createTimeEntry(payload: DTO_CreateTimeEntry) {
        const { project_id, started_in } = payload;
        const project = await checkDocument(this.projectService)
        (project_id, 'test');
        const workingPeriod = await checkDocument(this.workingPeriodService)
        (project.assignedWorkingPeriod.toString(), 'test');

        const newTimeEntry = await this.create({
            start: started_in,
            end: null,
            assignedProject: project._id,
            assignedWorkingPeriod: workingPeriod._id,
        });

        this.eventEmitter.emit(
            EVENT_TIME_ENTRY_CREATED,
            new TimeEntryCreatedEvent({
                time_entry_id: newTimeEntry._id,
                project_id: newTimeEntry.assignedProject.toString(),
                working_period_id: newTimeEntry.assignedWorkingPeriod.toString(),
            }),
        )

        return newTimeEntry;
    }

    async create(payload: TimeEntry): Promise<TimeEntryDocument> {
        return await (await this.model.create(payload)).save();
    }
    async findById(id: string) {
        return this.model.findById(id);
    }
}