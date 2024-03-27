import mongoose, { Connection } from "mongoose";
import { MONGO_URI } from "../../config/constants.config";
import { TENANT_CONFIG } from "../../config/mongo.config";

export const initTenantConnection = async (TENANT_DB_NAME: string): Promise<Connection> => {
	console.log(`Attempting to establish tenant ${TENANT_DB_NAME} connection...`);
	try {
		const db = mongoose.createConnection(`${MONGO_URI}`, {
			...TENANT_CONFIG,
			dbName: TENANT_DB_NAME, // Ensure dbName is correctly passed to the connection options
		});

		db.on(
			"error",
			console.error.bind(console, "[utils/connections/initTenantConnection] Failed to establish tenant connection: ")
		);

		await new Promise((resolve, reject) => {
			db.once("open", () => {
				if (db.name === "test") {
					console.log(
						"Failed: Connected to default 'test' database. Check if the specified database exists or if the dbName is correct."
					);
					reject(new Error("Connected to default 'test' database."));
				} else {
					console.log(`Successfully connected to tenant ${db.name}.`);
					resolve(true);
				}
			});
			db.on("error", (error) => {
				console.error("Connection error: ", error);
				reject(error);
			});
		});

		return db;
	} catch (error) {
		console.error("Error in initTenantConnection: ", error);
		throw error;
	}
};