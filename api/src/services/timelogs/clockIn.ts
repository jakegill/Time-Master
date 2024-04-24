import mongoose from "mongoose";
import { projectSchema } from "../../models/project.model";
import { tenantUserSchema } from "../../models/tenantUser.model";
import { getConnection } from "../tenancy/connectionManager";

const clockIn = async (projectId: string, employeeId: string, tenantName: string) => {
    const tenantDb = getConnection(tenantName);
    const ObjectId = mongoose.Types.ObjectId;

    try {
        const validProjectId = new ObjectId(projectId);
        const validEmployeeId = new ObjectId(employeeId);

        const projectUpdate = await tenantDb.model("Project", projectSchema).findByIdAndUpdate(
            validProjectId,
            { $push: { timelogs: { _id: new ObjectId(), clockIn: Date.now(), employee: validEmployeeId, project: validProjectId } } },
            { new: true, runValidators: true }
        );
        const userUpdate = await tenantDb.model("User", tenantUserSchema).findByIdAndUpdate(
            validEmployeeId,
            { $push: { timelogs: { _id: new ObjectId(), clockIn: Date.now(), project: validProjectId, employee: validEmployeeId } } },
            { new: true, runValidators: true }
        );
        console.log("Updated project and user for clockIn:", projectUpdate, userUpdate);
        return { projectUpdate, userUpdate };
    } catch (error) {
        console.error("Error during clockIn:", error);
        throw error;
    }
};

export { clockIn };