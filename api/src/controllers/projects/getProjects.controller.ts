import type { Request, Response } from "express";
import { getProjects } from "../../services/projects/getProjects";

// Get the all the forms assigned to a specific employee.

const getProjectsController = async (req: Request, res: Response) => {
	const tenantName = req.tenantName;
	const employeeId = req.userId;

	console.log("Attempting to get projects for ", employeeId);

	if (!(req.role === "employee")) {
		res.status(403).send("Unauthorized");
		return;
	}

	try {
		const projects = await getProjects(tenantName, employeeId);
		res.json({ status: 201, projects });
	} catch (error) {
		res.json({ status: 500, message: error });
	}
};

export { getProjectsController };