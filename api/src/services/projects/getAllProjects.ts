import { getConnection } from "../tenancy/connectionManager";
import { projectSchema } from "../../models/project.model";

const getAllProjects = async (tenantName: string) => {
	const tenantDb = getConnection(tenantName);
	if (!tenantDb) {
		throw new Error("Error creating form: tenant connection not established.");
	}

	try {
		console.log(`Getting forms for ${tenantName}...`);
		const projects = await tenantDb.model("Projects", projectSchema).find();
		return projects;
	} catch (error: any) {
		throw Error(error);
	}
};

export { getAllProjects };