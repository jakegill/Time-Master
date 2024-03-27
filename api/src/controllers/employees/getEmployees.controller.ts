import type { Request, Response } from "express";
import { getEmployees } from "../../services/employees/getEmployees";

const getEmployeesController = async (req: Request, res: Response) => {
	const tenantName = req.tenantName;

	if (!(req.role === "admin" || req.role === "manager")) {
		res.status(403).send("Unauthorized");
		return;
	}

	try {
		const employees = await getEmployees(tenantName);
		res.json({ status: 200, employees });
	} catch (error) {
		res.json({ status: 500, message: error });
	}
};

export { getEmployeesController };