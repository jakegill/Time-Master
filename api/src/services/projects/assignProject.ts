import type { Project } from "../../types/project";
import type { User } from "../../types/user";
import { projectSchema } from "../../models/project.model";
import { tenantUserSchema } from "../../models/tenantUser.model";
import { getConnection } from "../tenancy/connectionManager";

const assignProject = async (project: Project, employees: User[], tenantName: string) => {
	// Use connection for tenant
	const tenantDb = getConnection(tenantName);

	// Assign employee ids to projects
	await tenantDb.model("Project", projectSchema).findByIdAndUpdate(project._id, { assignees: employees });

	// Assign project ids to employees
	for (const employee of employees) {
		await tenantDb.model("User", tenantUserSchema).findByIdAndUpdate(employee._id, { $push: { projects: project } });
	}
};

export { assignProject };