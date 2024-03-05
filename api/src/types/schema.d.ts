import { Document } from 'mongoose';
import mongoose from 'mongoose';

export interface IProject extends Document {
	userId: mongoose.Schema.Types.ObjectId;
	name: string;
	description: string;
	createdAt: Date;
	users: mongoose.Schema.Types.ObjectId[];
	timelogs: mongoose.Schema.Types.ObjectId[];
}

export interface ITimelog extends Document {
	projectId: mongoose.Schema.Types.ObjectId;
	userId: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
	clockIn: Date;
	clockOut: Date;
}

export interface IUser extends Document {
	isAdmin: boolean;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	createdAt: Date;
	projects: mongoose.Schema.Types.ObjectId[];
	timelogs: mongoose.Schema.Types.ObjectId[];
}