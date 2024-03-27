import { getConnection } from "../../services/tenancy/connectionManager";
import { projectSchema } from "../../models/project.model";

interface createProjectInput {
	projectName: string;
	projectDescription?: string;
	tenantName: string;
}

const createProject = async (createProjectInput: createProjectInput) => {
	const tenantDb = getConnection(createProjectInput.tenantName);
	if (!tenantDb) {
		throw new Error("Error creating form: tenant connection not established.");
	}

	try {
		console.log("Creating project...");
		await tenantDb.model("Project", projectSchema).create(createProjectInput);
	} catch (error: any) {
		//idk what the MongoServerError type is.
		if (error.code === 11000) {
			throw Error("Form with this project already exists.");
		} else {
			throw Error("Error creating project.");
		}
	}
};

export { createProject };
