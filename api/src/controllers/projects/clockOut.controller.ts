import type { Request, Response } from "express";
import { clockOut } from "../../services/timelogs/clockOut";
import { Project } from "../../types/project";
import { User } from "../../types/user";

const clockOutController = async (req: Request, res: Response) => {
	
	const tenantName = req.tenantName;
	const userId = req.userId;
	const projectId = req.params.projectId;

	if (!(req.role === "admin" || req.role === "manager" || req.role === "employee")) {
		res.status(403).send("Unauthorized");
		return;
	}

	try {
		await clockOut(projectId, userId, tenantName);
		res.json({ status: 201, message: "Employee clocked out." });
	} catch (error) {
		res.json({ status: 500, message: error });
	}
};

export { clockOutController };