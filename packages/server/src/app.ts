import { Server } from "@type/Server";
import getSchema from "@util/getSchema";
import { redis } from "@util/redis";
import { SERVER_ADDRESS, SERVER_PORT } from "@util/secrets";
import { GraphQLServer, Options } from "graphql-yoga";

export const startServer = async () => {
  const server: Server = new GraphQLServer({
    schema: getSchema(),
    context: ({ request }) => ({
      redis,
      request
    })
  });

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
