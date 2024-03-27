import { server } from "./config/server.config";
import { PORT } from "./config/constants.config";
import { connectAllDb } from "./services/tenancy/connectionManager";

server.listen(PORT, async () => {
	console.log(`Server is running on port ${PORT}`);
	await connectAllDb();
});