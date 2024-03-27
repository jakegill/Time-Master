import mongoose from "mongoose";

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
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});