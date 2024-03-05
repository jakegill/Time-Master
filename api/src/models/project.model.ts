import mongoose, { Schema } from "mongoose";
import type { IProject } from "../types/schema";


const projectSchema = new Schema<IProject>({
	userId: { type: Schema.Types.ObjectId, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	users: [{ type: Schema.Types.ObjectId, ref: "User" }],
	timelogs: [{ type: Schema.Types.ObjectId, ref: "Timelog" }],
});

const Project = mongoose.model<IProject>("Project", projectSchema);
