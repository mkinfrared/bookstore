import { Resolvers } from "@type/Graphql";
import { Request, Express } from "express";
import { GraphQLServer } from "graphql-yoga";
import { ContextCallback } from "graphql-yoga/dist/types";
import { Redis } from "ioredis";

export interface Server extends GraphQLServer {
  context: Context;
}

export interface Context extends ContextCallback {
  redis: Redis;
  request: Request;
}

export interface Resolver extends Resolvers<Context> {}

export interface SessionRequest extends Request {
  session?: ServerSession;
}

export interface ServerSession extends Express.session {
  userID?: string;
}
