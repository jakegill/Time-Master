export interface Project {
    _id: mongoose.Types.ObjectId;
    projectName: string;
    projectDescription?: string;
    tenantName: string;
    assignees?: mongoose.Types.ObjectId[];
    timelogs: Timelog[];
}

export interface Timelog {
    clockIn: Date;
    clockOut: Date;
    employeeId: mongoose.Types.ObjectId;
}