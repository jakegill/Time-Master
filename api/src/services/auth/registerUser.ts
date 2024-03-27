import { getConnection } from "../tenancy/connectionManager";
import { userMetadataSchema } from "../../models/userMetadata.model";
import { tenantUserSchema } from "../../models/tenantUser.model";

type registerInput = {
	name: string;
	email: string;
	hashedPassword: string;
	tenantName: string;
	role: "admin" | "manager" | "inspector";
};

const registerUser = async ({ email, hashedPassword, tenantName, role, name }: registerInput) => {
	// Get connection from cache.
	const catalog = getConnection("Catalog");
	if (!catalog) {
		throw new Error("Catalog connection not established.");
	}

	// Create user metadata in catalog.
	const user = await catalog
		.model("User", userMetadataSchema)
		.create({ email, password: hashedPassword, tenantName, role });
	if (!user) {
		throw new Error("User not created.");
	}
	const userId = user._id;

	// Store user in tenant db.
	const tenantDb = getConnection(tenantName);
	await tenantDb
		.model("User", tenantUserSchema)
		.create({ _id: userId, email, password: hashedPassword, tenantName, role, name });

	return user;
};

export { registerUser };