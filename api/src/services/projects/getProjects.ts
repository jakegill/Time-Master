import { getConnection } from "../tenancy/connectionManager";
import { projectSchema } from "../../models/project.model";
import mongoose from "mongoose";

//All forms for assigned to a specific user

const getProjects = async (tenantName: string, employeeId: string) => {
	const tenantDb = getConnection(tenantName);
	if (!tenantDb) {
		throw new Error("Error getting projects: tenant connection not established.");
	}

	try {
		const employeeObjectId = new mongoose.Types.ObjectId(employeeId);
		const projects = await tenantDb.model("Project", projectSchema).find({
			assignees: { $in: [employeeObjectId] },
		});
		return projects;
	} catch (error: any) {
		throw Error(error);
	}
};

export { getProjects };