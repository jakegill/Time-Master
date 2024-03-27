import mongoose from "mongoose";

export const tenantUserSchema = new mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		tenantName: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["admin", "manager", "employee"],
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		forms: {
			type: [mongoose.Schema.Types.ObjectId],
			required: false,
		},
	},
	{ strict: false }
);