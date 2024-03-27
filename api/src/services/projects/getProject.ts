import { getConnection } from "../tenancy/connectionManager";
import { projectSchema } from "../../models/project.model";
import mongoose from "mongoose";

const getProject = async (tenantName: string, projectId: string) => {
	const tenantDb = getConnection(tenantName);
	if (!tenantDb) {
		throw new Error("Error getting form: tenant connection not established.");
	}

	try {
		console.log("Attempting to get project...");
		const project = await tenantDb.model("Project", projectSchema).findById(new mongoose.Types.ObjectId(projectId));
		return project;
	} catch (error: any) {
		console.log(error);
		throw Error(error);
	}
};

export { getProject };