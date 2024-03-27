import type { Request, Response } from "express";
import { createProject } from "../../services/projects/createProject";

const createProjectController = async (req: Request, res: Response) => {
	const { projectName, projectDescription } = req.body;

	const tenantName = req.tenantName;

	if (!(req.role === "admin" || req.role === "manager")) {
		res.status(403).send("Unauthorized");
		return;
	}

	try {
		await createProject({ projectName, projectDescription, tenantName });
		res.json({ status: 201, message: "Project created successfully." });
	} catch (error) {
		res.json({ status: 500, message: error });
	}
};

export { createProjectController };