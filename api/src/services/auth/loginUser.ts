import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getConnection } from "../tenancy/connectionManager";
import { userMetadataSchema } from "../../models/userMetadata.model";
import { JWT_SECRET } from "../../config/constants.config";

type loginInput = {
	email: string;
	password: string;
};

const loginUser = async ({ email, password }: loginInput) => {
	//Get connection from cache.

	const catalog = getConnection("Catalog");
	if (!catalog) {
		throw new Error("Catalog connection not established.");
	}

	// Find user in catalog.
	const user = await catalog.model("User", userMetadataSchema).findOne({ email }).exec();
	if (!user) {
		throw new Error("User not found.");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Invalid credentials.");
	}

	// Data for JWT
	const userData = {
		id: user._id,
		role: user.role,
		tenantName: user.tenantName,
	};
	const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "4h" });
	return token;
};

export { loginUser };