import mongoose, { Connection } from "mongoose";
import { MONGO_URI } from "../../config/constants.config";
import { CATALOG_CONFIG } from "../../config/mongo.config";

export const initCatalogConnection = async (): Promise<Connection> => {
	try {
		console.log("Attempting to establish catalog connection...");

		const db = mongoose.createConnection(`${MONGO_URI}`, CATALOG_CONFIG);

		db.on(
			"error",
			console.error.bind(console, "[utils/connections/initCatalogConnection] Failed to connect to catalog: ")
		);

		await new Promise((resolve, reject) => {
			db.once("open", resolve);
			db.on("error", reject);
		});

		console.log("Successfully connected to catalog.");
		return db;
	} catch (error) {
		console.error("Error in initCatalogConnection: ", error);
		throw error;
	}
};