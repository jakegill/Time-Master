import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "../routes/index";

const server = express();

const urlencodedParser = express.urlencoded({ extended: false });
const jsonParser = express.json();
server.use(urlencodedParser);
server.use(jsonParser);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors());

server.use(router);

export { server };