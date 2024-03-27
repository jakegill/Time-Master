import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/constants.config";
import jwt from "jsonwebtoken";

/*
Determine if the request has a valid token in the authorization header.
If the token is valid, call the next middleware.
If the token is invalid, send a 401 status code.
*/

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).send({ error: "Unauthorized." });
	}
	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		next();
	} catch (error) {
		res.status(401).send({ error: "Unauthorized." });
	}
};

export { authMiddleware };