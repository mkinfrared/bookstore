import { Resolvers } from "@type/Graphql";
import { Express, Request } from "express";
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

export type Middleware = <P, A, C, I>(
  resolver: Resolver,
  parent: P,
  args: A,
  context: C,
  info: I
) => any;
