import cors from 'cors';
import express from 'express';
import { router } from '../routes';

const server = express();

server.use(router);
server.use(cors)

export { server };