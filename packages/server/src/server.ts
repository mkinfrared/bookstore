import { SERVER_ADDRESS, SERVER_PORT } from "@util/secrets";
import { importSchema } from "graphql-import";
import { GraphQLServer, Options } from "graphql-yoga";
import "reflect-metadata";
import { resolvers } from "resolvers/resolvers";
import { createConnection } from "typeorm";

(async () => {
  try {
    await createConnection();
    const typeDefs = importSchema("./schema/schema.graphql");
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
  }
})();
