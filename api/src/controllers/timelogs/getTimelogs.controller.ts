import type { Request, Response } from "express";
import { getTimelogs } from "../../services/timelogs/getTimelogs";

const getTimelogsController = async (req: Request, res: Response) => {
    const tenantName = req.tenantName;

	if (!(req.role === "admin" || req.role === "manager")) {
		res.status(403).send("Unauthorized");
		return;
	}

    console.log("Attempting to get timelogs.")

    try {
        const timelogs = await getTimelogs(tenantName);
        res.status(200).json({ timelogs });
    } catch (e) {
        console.error("Failed to retrieve timelogs:", e);
        res.status(500).json({ message: "Failed to retrieve timelogs due to an internal error." });
    }
};

export { getTimelogsController };