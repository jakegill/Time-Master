import { loginUser } from "../../../src/services/auth/loginUser";
import bcrypt from "bcrypt";

jest.mock("jsonwebtoken", () => ({
	sign: jest.fn((payload, secretKey, options) => {
		const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
			"base64"
		);
		return `header.${encodedPayload}.signature`;
	}),
}));

jest.mock("bcrypt", () => ({
	compare: jest.fn(),
}));

const mockExec = jest.fn();

jest.mock("../../../src/services/tenancy/connectionManager", () => ({
	getConnection: jest.fn().mockReturnValue({
		model: jest.fn().mockReturnValue({
			findOne: () => ({
				exec: mockExec,
			}),
		}),
	}),
}));

describe("loginUser", () => {
	it("Throws an error if the user is not found", async () => {
		mockExec.mockResolvedValue(null);

		await expect(
			loginUser({ email: "nonexistent@example.com", password: "password" })
		).rejects.toThrow("User not found.");
	});

	it("Generates a token containing the correct user id, role, and tenantName", async () => {
		mockExec.mockResolvedValue({
			_id: "userId",
			email: "test@example.com",
			password: "hashedPassword",
			role: "userRole",
			tenantName: "tenantName",
		});

		(bcrypt.compare as jest.Mock).mockResolvedValue(true);

		const token = await loginUser({
			email: "test@example.com",
			password: "password",
		});
		const base64Payload = token.split(".")[1];
		const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString());

		expect(payload).toHaveProperty("id", "userId");
		expect(payload).toHaveProperty("role", "userRole");
		expect(payload).toHaveProperty("tenantName", "tenantName");
	});

	it("Throws an error for invalid credentials", async () => {
		mockExec.mockResolvedValue({
			_id: "userId",
			email: "test@example.com",
			password: "hashedPassword",
			role: "userRole",
			tenantName: "tenantName",
		});
		(bcrypt.compare as jest.Mock).mockResolvedValue(false);

		await expect(
			loginUser({ email: "test@example.com", password: "wrongPassword" })
		).rejects.toThrow("Invalid credentials.");
	});
});