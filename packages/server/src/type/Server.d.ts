import { Resolvers } from "@generated/Graphql";
import { Request } from "express";
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
