import { Server } from "@type/Server";
import getSchema from "@util/getSchema";
import { redis } from "@util/redis";
import {
  FRONTEND_HOST,
  NODE_ENV,
  REDIS_HOST,
  SERVER_ADDRESS,
  SERVER_PORT,
  SESSION_SECRET
} from "@util/secrets";
import connectRedis from "connect-redis";
import { CorsOptions } from "cors";
import session from "express-session";
import { GraphQLServer, Options } from "graphql-yoga";

export const startServer = async () => {
  const RedisStore = connectRedis(session);
  const server: Server = new GraphQLServer({
    schema: getSchema(),
    context: ({ request }) => ({
      redis,
      request
    })
  });

  server.express.use(
    session({
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      },
      store: new RedisStore({
        host: REDIS_HOST
      })
    })
  );

  const cors: CorsOptions = {
    credentials: true,
    origin: [FRONTEND_HOST, "*"]
  };

  const options: Options = {
    playground: "/graphql",
    port: SERVER_PORT,
    cors
  };

  const app = await server.start(options);
  console.log(`Server is running on port ${SERVER_PORT}`);
  console.log(
    `Documentation is available at ${SERVER_ADDRESS}:${SERVER_PORT}${options.playground}`
  );

  return app;
};
