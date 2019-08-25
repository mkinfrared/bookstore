import createOrmConnection from "@db/createOrmConnection";
import { Server } from "http";
import { Connection } from "typeorm";

import { startServer } from "../app";

export let httpServer: Server;
let connection: Connection;

beforeAll(async () => {
  connection = await createOrmConnection();
  httpServer = await startServer();
});

beforeEach(async () => {
  await connection.synchronize();
});

afterEach(async () => {
  await connection.dropDatabase();
});

afterAll(() => {
  if (httpServer) {
    httpServer.close();
  }
});
