/** Уведомление о создании нового проекта **/
export const EVENT_TIME_ENTRY_CREATED = 'time-entry.created';
export interface TimeEntryCreatedEventPayload {
    time_entry_id: string,
    project_id: string,
    working_period_id: string,
}
export class TimeEntryCreatedEvent {
    constructor(public readonly eventPayload: TimeEntryCreatedEventPayload) {}
}