export interface TimeEntry {
    _id: string;
    start: number;
    end: number | null;
    assignedProject: string;
    assignedWorkingPeriod: string;
}
export interface Project {
    _id: string;
    title: string;
    createdTime: number;
    isRunning: boolean;
    currentEntry: string | null;
    totalTime: number;
    assignedTimeEntries: TimeEntry[];
    assignedWorkingPeriod: string;
}
export interface WorkingPeriod {
    _id: string;
    createdBy: string;
    createdTime: number;
    assignedDay: number;
    assignedProjects: Project[];
    assignedTimeEntries: TimeEntry[];
}