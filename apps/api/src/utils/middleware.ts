import { eq, or } from "drizzle-orm";
import { db } from "../db/db";
import { users } from "../db/schema";
import { Context } from "../types/contextType";
import { __ERRORCODES__ } from "./errorHandler";

export const isLoggedIn = async (
  resolve: any,
  parent: any,
  args: any,
  ctx: Context,
  info: any
) => {
  if (!ctx.session || !ctx.session.userId) {
    return {
      response: {
        success: false,
        errors: [__ERRORCODES__.LoginRequired],
      },
    };
  } else {
    const user = (
      await db
        .select({ verified: users.verified })
        .from(users)
        .where(
          or(
            eq(users.id, ctx.session.userId),
            eq(users.googleId, ctx.session.userId)
          )
        )
    )[0];
    if (!user.verified) {
      return {
        response: {
          success: false,
          errors: [__ERRORCODES__.ConfirmEmail],
        },
      };
    }
    return resolve(parent, args, ctx, info);
  }
};

export const permissions = {
  Query: {
    me: isLoggedIn,
  },
  Mutation: {
    logout: isLoggedIn,
    logoutAll: isLoggedIn,
  },
};
