import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/constants.config";
import jwt, { type JwtPayload } from "jsonwebtoken";

/*
The following function attaches the users role to the subsequent requests for authorization purposes.
req.role
*/

const resolveRole = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).send({ error: "Unauthorized." });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

		// Extract role from token.
		const role = decoded.role;
		if (!role) {
			return res.status(400).send({ error: "Error resolving role: role not found in token." });
		}

		// Attach role to request object.
		req.role = role;
		next();
	} catch (error) {
		res.status(401).send({ error: "Unauthorized." });
	}
};

export { resolveRole };