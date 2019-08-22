import createOrmConnection from "@db/createOrmConnection";
import { Server } from "http";
import { Connection } from "typeorm";

import { startServer } from "../app";

let httpServer: Server;
let connection: Connection;

beforeAll(async () => {
  console.log("before all");

  connection = await createOrmConnection();
  httpServer = await startServer();
});

beforeEach(async () => {
  console.log("before each");

  await connection.synchronize();
});

afterEach(async () => {
  console.log("after each");

  await connection.dropDatabase();
});

afterAll(() => {
  console.log("after all");

  if (httpServer) {
    httpServer.close();
  }
});
