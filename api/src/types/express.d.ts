import { Connection } from "mongoose";

declare global {
	namespace Express {
		interface Request {
			tenantName: string;
			role: string;
			userId: string;
		}
	}
}
