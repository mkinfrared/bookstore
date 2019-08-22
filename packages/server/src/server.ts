import createOrmConnection from "@db/createOrmConnection";
import "reflect-metadata";

import { startServer } from "./app";

const main = async () => {
  try {
    await createOrmConnection();
    startServer();
  } catch (e) {
    console.log("Could not connect to database");
    console.log(e);
  }
};

main();
