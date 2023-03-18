/** Уведомление о создании нового проекта **/
export const EVENT_PROJECT_CREATED = 'project.created';
export interface ProjectCreatedEventPayload {
    working_period_id: string,
    project_id: string,
}
export class ProjectCreatedEvent {
    constructor(public readonly eventPayload: ProjectCreatedEventPayload) {}
}