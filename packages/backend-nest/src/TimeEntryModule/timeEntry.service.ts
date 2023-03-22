import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model, QueryOptions, Types, UpdateQuery, UpdateWriteOpResult} from "mongoose";
import {TimeEntry, TimeEntryDocument} from "./timeEntry.schema";

@Injectable()
export class TimeEntryService {
    constructor(
        @InjectModel(TimeEntry.name) private readonly model: Model<TimeEntryDocument>,
    ) {}
    async createTimeEntry(): Promise<TimeEntryDocument> {
        return this.create({ start: Date.now(), end: null });
    }

    async create(payload: TimeEntry): Promise<TimeEntryDocument> {
        return await (await this.model.create(payload)).save();
    }
    async updateOne(
        filter: FilterQuery<TimeEntryDocument>,
        payload: UpdateQuery<TimeEntryDocument>,
        options?: QueryOptions
    ): Promise<UpdateWriteOpResult> {
        return this.model.updateOne(filter, payload, options);
    }
    async findById(id: string | Types.ObjectId) {
        return this.model.findById(id);
    }
}