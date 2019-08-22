import { add } from "@bookstore/common";
import { SERVER_PORT } from "@util/secrets";
import { Server } from "http";
import "reflect-metadata";
import { createConnection } from "typeorm";

import app from "./app";

export let server: Server;

(async () => {
  try {
    await createConnection();
    add(24, 28);
    server = app.listen(SERVER_PORT, () =>
      console.log(`Server is running on port ${SERVER_PORT}`)
    );
  } catch (e) {
    console.log("Could not connect to database");
  }
})();
