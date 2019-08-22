import { SERVER_ADDRESS, SERVER_PORT } from "@util/secrets";
import { GraphQLServer, Options } from "graphql-yoga";
import "reflect-metadata";
import { createConnection } from "typeorm";

(async () => {
  try {
    await createConnection();
    const typeDefs = `
      type Query {
        hello(name: String): String!
      }
      `;

    const resolvers = {
      Query: {
        hello: (_: any, { name }: any) => `Hello ${name || "World"}`
      }
    };

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
