import type { Project } from "./project";

export interface User {
	_id: mongoose.Types.ObjectId;
	name: String;
	email: String;
	password: String;
	tenantName: String;
	role: "admin" | "manager" | "inspector";
	projects?: mongoose.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}