import mongoose from "mongoose";
import { getConnection } from "../tenancy/connectionManager";
import { tenantUserSchema } from "../../models/tenantUser.model";

export const getEmployeeTimelogs = async (tenantName: string, userId: string) => {
	const tenantDb = getConnection(tenantName);
	if (!tenantDb) {
		throw new Error("Error getting timelogs: tenant connection not established.");
	}

	if (!mongoose.Types.ObjectId.isValid(userId)) {
		throw new Error("Invalid user ID format.");
	}

	try {
		const userData = await tenantDb.model("User", tenantUserSchema).find({ _id: userId }).lean();

        if (userData) {
            return userData[0].timelogs || userData[0].timelogs!;
        }

	} catch (error: any) {
		throw new Error(`Error retrieving timelogs: ${error.message}`);
	}
};
