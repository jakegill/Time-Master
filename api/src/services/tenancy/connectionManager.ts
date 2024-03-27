import type { Connection } from "mongoose";
import { tenantMetadataSchema } from "../../models/tenantMetadata.model";
import { initCatalogConnection } from "../../utils/connections/initCatalogConnection";
import { initTenantConnection } from "../../utils/connections/initTenantConnection";

/*
Establishes connections to catalog & tenants.
Caches connections for reuse.
Exports functions to retrieve connections.
*/

let connectionCache: Record<string, Connection> = {};

const connectAllDb = async () => {
	// Establish & cache catalog connection.
	const catalog: Connection = await initCatalogConnection();
	connectionCache["Catalog"] = catalog;
	const tenantsMetadata = await catalog.model("Tenant", tenantMetadataSchema, "tenants").find({}).exec();

	// Establish & cache tenants connections.
	for (const tenant of tenantsMetadata) {
		const tenantDbConnection: Connection = await initTenantConnection(tenant.tenantName);
		connectionCache[tenant.tenantName] = tenantDbConnection;
	}
};

const getConnection = (key: string): Connection => {
	return connectionCache[key];
};

const getAllConnections = (): Record<string, Connection> => {
	return { ...connectionCache };
};

const setConnection = (key: string, connection: Connection) => {
	connectionCache[key] = connection;
};

export { connectAllDb, getConnection, setConnection, getAllConnections };