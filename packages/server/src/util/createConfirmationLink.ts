import { Request } from "express";
import { Redis } from "ioredis";
import uuid from "uuid/v4";

export default async (userID: string, redis: Redis, request: Request) => {
  const id = uuid();

  await redis.set(id, userID, "EX", 60 * 60 * 24); // 24 hours

  const link = request.protocol + "://" + request.headers.host;

  return `${link}/confirm/${id}`;
};
