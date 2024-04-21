import { Connection } from "mongoose";
import { initCatalogConnection } from "../../../src/utils/connections/initCatalogConnection";


// Mocking mongoose.createConnection
jest.mock("mongoose", () => ({
	createConnection: jest.fn().mockReturnValue({
		_mockMongoUri: "<mongouri>",
		on: jest.fn((event, callback) => {
			if (event === "open") {
				setTimeout(callback, 100); // Simulate async connection open
			}
		}),
		once: jest.fn().mockImplementation((event, callback) => callback()),
	}),
}));

describe("initCatalogConnection", () => {
	it("Establishes a catalog connection successfully", async () => {
		const dbConnection = await initCatalogConnection();

		expect(dbConnection).toBeDefined();
		expect(dbConnection).toHaveProperty("on");
		expect(dbConnection).toHaveProperty("once");
	});
});