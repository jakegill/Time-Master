import { getConnection, setConnection } from "./connectionManager";
import { initTenantConnection } from "../../utils/connections/initTenantConnection";
import { tenantMetadataSchema } from "../../models/tenantMetadata.model";
import { userMetadataSchema } from "../../models/userMetadata.model";
import { tenantUserSchema } from "../../models/tenantUser.model";

type createTenantInput = {
	tenantName: string;
	adminName: string;
	adminEmail: string;
	adminPassword: string;
};

/*
Use connection from cache to the access catalog database.
Create a new tenant document in the catalog.tenants collection using dbName, & companyName.
Create a new connection using dbName for the new database.
Create a new user document in the users collection of the new tenant db using adminEmail, & adminPassword.
Set the new tenant connection in the connection cache.
*/

const createTenant = async ({ tenantName, adminName, adminEmail, adminPassword }: createTenantInput) => {
	const catalogDb = getConnection("Catalog");
	await catalogDb.model("Tenant", tenantMetadataSchema, "tenants").create({ tenantName });
	const owner = await catalogDb.model("User", userMetadataSchema, "users").create({
		tenantName,
		email: adminEmail,
		password: adminPassword,
		role: "admin",
	});
	const ownerId = owner._id;

	const tenantDb = await initTenantConnection(tenantName);
	try {
		await tenantDb
			.model("TenantUser", tenantUserSchema, "users")
			.create({ _id: ownerId, email: adminEmail, password: adminPassword, name: adminName, tenantName, role: "admin" });
	} catch (error) {
		console.error("Error creating new database: ", error);
		throw error;
	} finally {
		console.log("Database created... setting connection in cache.");
		setConnection(tenantName, tenantDb);
	}
};

export { createTenant };