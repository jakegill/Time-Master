import mongoose from "mongoose";
import { timelogSchema } from "../../models/timelog.model";
import { getConnection } from "../tenancy/connectionManager";
import { projectSchema } from "../../models/project.model";

export const getTimelogs = async (tenantName: string) => {
    const tenantDb = getConnection(tenantName);
    if (!tenantDb) {
        throw new Error("Error getting timelogs: tenant connection not established.");
    }

    try {
        const projectData = await tenantDb.model("Project", projectSchema).find().lean();
        let allTimelogs = [] as any[];

        projectData.forEach(project => {
            if (project.timelogs && project.timelogs.length > 0) {
                allTimelogs.push(...project.timelogs);
            }
        });
        console.log("All Timelogs: ", allTimelogs);
        return allTimelogs;
    } catch (error) {
        console.error("Error fetching timelogs:", error);
        throw new Error("Failed to fetch timelogs.");
    }
};