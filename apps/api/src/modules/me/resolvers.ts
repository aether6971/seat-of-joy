import { eq, or } from "drizzle-orm";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { Resolvers } from "../../types/graphql";

export const MeResolvers: Resolvers = {
  Query: {
    me: async (_, __, { session }) => {
      const user = await db
        .select({
          username: users.username,
          email: users.email,
        })
        .from(users)
        .where(
          or(eq(users.id, session.userId), eq(users.googleId, session.userId))
        );
      return {
        user,
        response: {
          success: true,
          errors: [],
        },
      };
    },
  },
};
