import { Redis } from "ioredis";
import { removeAllSessions } from "./removeAllSessions";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const lockAccount = async (userId: string, redis: Redis) => {
  await db
    .update(users)
    .set({
      locked: true,
    })
    .where(eq(users.id, userId));

  await removeAllSessions(userId, redis);
};
