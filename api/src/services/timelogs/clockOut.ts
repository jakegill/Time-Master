import mongoose from "mongoose";
import { projectSchema } from "../../models/project.model";
import { tenantUserSchema } from "../../models/tenantUser.model";
import { getConnection } from "../tenancy/connectionManager";

const clockOut = async (projectId: string, employeeId: string, tenantName: string) => {
	const tenantDb = getConnection(tenantName);

	try {
		const ObjectId = mongoose.Types.ObjectId;
		const validProjectId = new ObjectId(projectId);
		const validEmployeeId = new ObjectId(employeeId);

		const projectUpdate = await tenantDb.model("Project", projectSchema).findOneAndUpdate(
			{
				_id: validProjectId,
				timelogs: {
					$elemMatch: { employee: validEmployeeId, clockOut: { $exists: false } },
				},
			},
			{
				$set: { "timelogs.$.clockOut": Date.now() },
			},
			{ new: true, runValidators: true }
		);

		const userUpdate = await tenantDb.model("User", tenantUserSchema).findOneAndUpdate(
			{
				_id: validEmployeeId,
				timelogs: {
					$elemMatch: { project: validProjectId, clockOut: { $exists: false } },
				},
			},
			{
				$set: { "timelogs.$.clockOut": Date.now() },
			},
			{ new: true, runValidators: true }
		);

		console.log("Updated project and user for clockOut:", projectUpdate, userUpdate);
		return { projectUpdate, userUpdate };
	} catch (error) {
		console.error("Error during clockOut:", error);
		throw error;
	}
};

export { clockOut };
