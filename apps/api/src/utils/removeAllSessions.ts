import { Redis } from "ioredis";
import { redisSessionPrefix, redisUserSessionIdPrefix } from "../constants";

export const removeAllSessions = async (userId: string, redis: Redis) => {
  const sessionIds = await redis.lrange(
    `${redisUserSessionIdPrefix}${userId}`,
    0,
    -1
  );

  const promises = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < sessionIds.length; i += 1) {
    promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
  }
  await Promise.all(promises);
  const keys = await redis.keys(`${redisSessionPrefix}*`);

  if (keys.length != 0) {
    await redis.del(keys);
  }
};
