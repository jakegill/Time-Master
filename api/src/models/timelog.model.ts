import mongoose, { Schema } from "mongoose";
import type { ITimelog } from "../types/schema";

const timelogSchema = new Schema<ITimelog>({
	projectId: { type: Schema.Types.ObjectId, required: true },
	userId: { type: Schema.Types.ObjectId, required: true },
	createdAt: { type: Date, default: Date.now },
	clockIn: { type: Date, required: true },
	clockOut: { type: Date, required: true },
});

const Timelog = mongoose.model<ITimelog>("Timelog", timelogSchema);
