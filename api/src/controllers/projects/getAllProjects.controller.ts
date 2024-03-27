import type { Request, Response } from "express";
import { getAllProjects } from "../../services/projects/getAllProjects";

// Get all forms under a specific tenant.

const getAllProjectsController = async (req: Request, res: Response) => {
	const tenantName = req.tenantName;

	if (!(req.role === "admin" || req.role === "manager")) {
		res.status(403).send("Unauthorized");
		return;
	}

	try {
		const projects = await getAllProjects(tenantName);
		res.json({ status: 201, projects });
	} catch (error) {
		res.json({ status: 500, message: error });
	}
};

export { getAllProjectsController };