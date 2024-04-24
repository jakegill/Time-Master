import mongoose from "mongoose";

export const timelogSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        clockIn: {
            type: Date,
            required: true,
        },
        clockOut: {
            type: Date,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
    },
    { strict: false }
);