import { getConnection } from "../tenancy/connectionManager";
import { tenantUserSchema } from "../../models/tenantUser.model";

const getEmployees = async (tenantName: string) => {
	const tenantDb = getConnection(tenantName);
	if (!tenantDb) {
		throw new Error(
			"Error getting employees: tenant connection not established."
		);
	}

	try {
		console.log("Getting employees...");
		const employees = await tenantDb.model("User", tenantUserSchema).find({
			$or: [{ role: "employee" }, { role: "manager" }],
		});
		return employees;
	} catch (error) {
		throw Error("Error getting inspectors.");
	}
};

export { getEmployees };
