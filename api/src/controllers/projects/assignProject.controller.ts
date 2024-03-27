import type { Request, Response } from "express";
import { assignProject } from "../../services/projects/assignProject";
import { Project } from "../../types/project";
import { User } from "../../types/user";

const assignProjectController = async (req: Request, res: Response) => {
	const { project, employees }: { project: Project; employees: User[] } = req.body;

	const tenantName = req.tenantName;

	if (!(req.role === "admin" || req.role === "manager")) {
		res.status(403).send("Unauthorized");
		return;
	}

	try {
		await assignProject(project, employees, tenantName);
		res.json({ status: 201, message: "Project assigned successfully." });
	} catch (error) {
		res.json({ status: 500, message: error });
	}
};

export { assignProjectController };