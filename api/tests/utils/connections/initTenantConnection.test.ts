import { initTenantConnection } from "../../../src/utils/connections/initTenantConnection";

jest.mock("mongoose", () => ({
	createConnection: jest.fn((uri, options) => {
		const dbName = options.dbName;
		const mockConnection = {
			name: dbName,
			on: jest.fn(),
			once: jest.fn((event, callback) => {
				if (event === "open") {
					if (dbName === "test") {
						callback(new Error("Connected to default 'test' database."));
					} else {
						callback();
					}
				}
			}),
		};
		// Simulating error event listener for connection
		mockConnection.on.mockImplementation((event, handler) => {
			if (event === "error" && dbName === "errorCase") {
				handler(new Error("Connection error"));
			}
		});
		return mockConnection;
	}),
}));

describe("initTenantConnection", () => {
	it("Establishes a successful connection to a tenant database", async () => {
		const tenantDbName = "validTenantDb";
		const connection = await initTenantConnection(tenantDbName);

		expect(connection).toBeDefined();
		expect(connection.name).toBe(tenantDbName);
	});
});