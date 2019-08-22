import { resolvers } from "@resolvers/resolvers";
import { SERVER_ADDRESS, SERVER_PORT } from "@util/secrets";
import { importSchema } from "graphql-import";
import { GraphQLServer, Options } from "graphql-yoga";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";

const start = async () => {
  try {
    await createConnection();
    const typeDefs = importSchema(
      path.join(__dirname, "./schema/schema.graphql")
    );
    const server = new GraphQLServer({ typeDefs, resolvers });
    const options: Options = {
      playground: "/graphql",
      port: SERVER_PORT
    };

    server.start(options, () => {
      console.log(`Server is running on port ${SERVER_PORT}`);
      console.log(
        `Documentation is available at ${SERVER_ADDRESS}:${SERVER_PORT}${options.playground}`
      );
    });
  } catch (e) {
    console.log("Could not connect to database");
    console.log(e);
  }
};

start();
