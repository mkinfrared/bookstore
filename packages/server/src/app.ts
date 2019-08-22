import { resolvers } from "@resolvers/resolvers";
import { SERVER_ADDRESS, SERVER_PORT } from "@util/secrets";
import { importSchema } from "graphql-import";
import { GraphQLServer, Options } from "graphql-yoga";
import path from "path";

export let server: GraphQLServer;

export const startServer = async () => {
  const typeDefs = importSchema(
    path.join(__dirname, "./schema/schema.graphql")
  );
  server = new GraphQLServer({ typeDefs, resolvers });
  const options: Options = {
    playground: "/graphql",
    port: SERVER_PORT
  };

  const app = await server.start(options);
  console.log(`Server is running on port ${SERVER_PORT}`);
  console.log(
    `Documentation is available at ${SERVER_ADDRESS}:${SERVER_PORT}${options.playground}`
  );

  return app;
};
