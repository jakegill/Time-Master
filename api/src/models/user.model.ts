import mongoose, { Schema } from "mongoose";
import type { IUser } from "../types/schema";

const userSchema = new Schema<IUser>({
	isAdmin: { type: Boolean, default: false },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
	timelogs: [{ type: Schema.Types.ObjectId, ref: "Timelog" }],
});

const User = mongoose.model<IUser>("User", userSchema);
