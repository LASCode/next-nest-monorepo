export interface TimeEntry {
    start: number;
    end: number | null;
    assignedProject: string;
    assignedWorkingPeriod: string;
}
export interface Project {
    title: string;
    createdTime: number;
    assignedTimeEntries: string[];
    assignedWorkingPeriod: string;
}
export interface WorkingPeriod {
    createdBy: string;
    createdTime: number;
    assignedDay: number;
    assignedProjects: Project[];
    assignedTimeEntries: TimeEntry[];
}