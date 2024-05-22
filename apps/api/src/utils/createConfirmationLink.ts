import { Redis } from "ioredis";
import { v4 } from "uuid";
import { redisEmailVerifyPrefix } from "../constants";

export const createConfirmationLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = v4();
  await redis.set(`${redisEmailVerifyPrefix}${id}`, userId, "EX", 60 * 24);
  return `${url}/confirm/${id}`;
};
