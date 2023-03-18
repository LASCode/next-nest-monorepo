import {Document, Model} from "mongoose";
import {OnEvent} from "@nestjs/event-emitter";
import {EVENT_SERVICE_COLLECTION_DROP} from "../Events";

export abstract class ModelCleaner<Doc extends Document, Ent> {
    protected constructor(protected readonly entityModel: Model<Doc>) {}

    @OnEvent(EVENT_SERVICE_COLLECTION_DROP)
    async dropCollection() {
        this.entityModel.deleteMany({});
    }
}