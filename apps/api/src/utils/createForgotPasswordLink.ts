import { Redis } from "ioredis";
import { v4 } from "uuid";
import { redisPassChangePrefix } from "../constants";

export const createForgotPasswordLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = v4();
  await redis.set(`${redisPassChangePrefix}${id}`, userId, "EX", 60 * 60 * 2);
  return `${url}/change-password/${id}`;
};
