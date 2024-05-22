import { eq, or } from "drizzle-orm";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { Resolvers } from "../../types/graphql";
import { compare } from "bcryptjs";
import { redisUserSessionIdPrefix } from "../../constants";
import { __ERRORCODES__ } from "../../utils/errorHandler";

export const LoginResolvers: Resolvers = {
  Mutation: {
    login: async (
      _,
      { password, email, username },
      { session, redis, req }
    ) => {
      let identifier;
      if (!username && email) {
        identifier = eq(users.email, email);
      } else if (!email && username) {
        identifier = eq(users.username, username);
      } else if (email && username) {
        identifier = eq(users.email, email);
      } else {
        return {
          response: {
            success: false,
            errors: [__ERRORCODES__.UsernameOrEmailRequired],
          },
        };
      }
      const user = (await db.select().from(users).where(or(identifier)))[0];
      if (!user) {
        return {
          response: {
            success: false,
            errors: [__ERRORCODES__.NoUserWithEmail],
          },
        };
      }
      if (user.locked) {
        return {
          response: { success: false, errors: [__ERRORCODES__.AccountLocked] },
        };
      }
      if (!user.verified) {
        return {
          response: { success: false, errors: [__ERRORCODES__.ConfirmEmail] },
        };
      }

      const valid = await compare(password, user.password || "");
      if (!valid) {
        return {
          response: { success: false, errors: [__ERRORCODES__.BadPassword] },
        };
      }
      session.userId = user.id;
      if (req.sessionID) {
        await redis.lpush(
          `${redisUserSessionIdPrefix}${user.id}`,
          req.sessionID
        );
      }

      return { response: { success: true, errors: [] } };
    },
  },
};
