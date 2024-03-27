import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/express-mongo";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const SALT = 10;
export const PORT = 8000;