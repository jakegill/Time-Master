import type { Project } from "../../types/project";
import type { User } from "../../types/user";
import { projectSchema } from "../../models/project.model";
import { tenantUserSchema } from "../../models/tenantUser.model";
import { getConnection } from "../tenancy/connectionManager";

const assignProject = async (project: Project, employees: User[], tenantName: string) => {
	// Use connection for tenant
	const tenantDb = getConnection(tenantName);
	console.log("Assigning project for: ", employees)
	// Assign employee ids to projects
	try {
		await tenantDb.model("Project", projectSchema).findByIdAndUpdate(project._id, { assignees: employees });
		// Assign project ids to employe es
		for (const employee of employees) {
			await tenantDb.model("User", tenantUserSchema).findByIdAndUpdate(employee._id, { $push: { projects: project } });
		}
	} catch (e) {
		console.log(e);
	}
};

export { assignProject };