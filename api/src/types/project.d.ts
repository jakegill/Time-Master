export interface Project {
    _id: mongoose.Types.ObjectId;
    projectName: string;
    projectDescription?: string;
    tenantName: string;
    assignees?: mongoose.Types.ObjectId[];
}