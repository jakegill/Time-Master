import type { Project,  } from "../../types/project";
import type { User } from "../../types/user";
import { projectSchema } from "../../models/project.model";
import { getConnection } from "../tenancy/connectionManager";

const clockIn = async (project: Project, employee: User, tenantName: string) => {
	// Use connection for tenant
	const tenantDb = getConnection(tenantName);

    // Go to the project's timelogs & clock the user in
    const res = await tenantDb.model("Project", projectSchema).findByIdAndUpdate(project._id, { $push: { timelogs: { clockIn: Date.now(), employeeId: employee._id } } });
    console.log(res);
    return res;
};

export { clockIn };