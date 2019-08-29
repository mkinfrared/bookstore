import { REDIS_HOST } from "@util/secrets";
import Redis from "ioredis";

export const redis = new Redis({
  host: REDIS_HOST,
  port: 6379
});
