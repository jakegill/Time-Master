import type { Request, Response } from "express";
import { createTenant } from "../../services/tenancy/createTenant";
import bcrypt from "bcrypt"
import {SALT} from "../../config/constants.config";

const createTenantController = async (req: Request, res: Response) => {
	const { tenantName, adminEmail, adminPassword, adminName } = req.body;
	const role = req.role;

	if (role !== "superAdmin") {
		res.status(403).send("Unauthorized");
		return;
	}

	const hashedPassword = await bcrypt.hash(adminPassword, SALT);
	try {
		await createTenant({ tenantName, adminEmail, adminPassword: hashedPassword, adminName });
		res.status(201).send("Tenant created successfully");
	} catch (error) {
		res.status(500).send("Error creating tenant");
	}
};

export { createTenantController };