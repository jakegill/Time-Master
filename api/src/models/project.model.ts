import mongoose from "mongoose";
import { timelogSchema } from "./timelog.model";

export const projectSchema = new mongoose.Schema({
	tenantName: {
		type: String,
		required: true,
	},
	projectName: {
		type: String,
		required: true,
		unique: true,
	},
	projectDescription: {
		type: String,
		required: true,
	},
	assignees: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "User",
	},
	timelogs: [timelogSchema],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});
