import type { Request, Response } from "express";
import { getEmployeeTimelogs } from "../../services/timelogs/getEmployeeTimelogs";

const getEmployeeTimelogsController = async (req: Request, res: Response) => {
	
	const tenantName = req.tenantName;
	const userId = req.userId;

    try {
        const timelogs = await getEmployeeTimelogs(tenantName, userId);
        res.json({ status: 200, timelogs });
    } catch (e) {
        res.json({ status: 500, message: e });
        console.log(e);
    }
}

export { getEmployeeTimelogsController };