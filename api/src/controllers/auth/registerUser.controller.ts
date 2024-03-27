import type { Request, Response } from "express";
import { registerUser } from "../../services/auth/registerUser";
import bcrypt from "bcrypt";
import { SALT } from "../../config/constants.config";

const registerUserController = async (req: Request, res: Response) => {
	const { email, password, role, name } = req.body;
	const tenantName = req.tenantName;
	const userRole = req.role;

	if (!(userRole === "superAdmin" || userRole === "admin")) {
		res.status(403).send({ status: 403, message: "Forbidden." });
		return;
	}

	const hashedPassword = await bcrypt.hash(password, SALT);

	try {
		const user = await registerUser({ email, hashedPassword, tenantName, role, name });
		if (!user) {
			throw new Error("registerUser returned null.");
		}
		res.status(201).send({ status: 201, message: "User registered successfully." });
	} catch (error) {
		res.status(500).send({ status: 500, message: `${error}` });
	}
};

export { registerUserController };