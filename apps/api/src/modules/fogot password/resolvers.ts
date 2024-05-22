import { eq } from "drizzle-orm";
import { redisPassChangePrefix, redisSessionPrefix } from "../../constants";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { Resolvers } from "../../types/graphql";
import { lockAccount } from "../../utils/lockAccount";
import { createForgotPasswordLink } from "../../utils/createForgotPasswordLink";
import { sendMail } from "../../utils/sendMail";
import { hash } from "bcryptjs";
import { __ERRORCODES__ } from "../../utils/errorHandler";

export const ForgotResolvers: Resolvers = {
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email },
      { redis, url, transporter }
    ) => {
      const user = (
        await db
          .select({ id: users.id, name: users.username })
          .from(users)
          .where(eq(users.email, email))
      )[0];
      if (!user) {
        return {
          response: {
            success: false,
            errors: [__ERRORCODES__.NoUserWithEmail],
          },
        };
      }
      await lockAccount(user.id, redis);
      const link = await createForgotPasswordLink(url, user.id, redis);
      await sendMail(
        email || "damodara.abhiram@gmail.com",
        `Hey ${user.name}! <a href="${link}">Click here to recover your password</a>`,
        "Seat of Joy Password Recovery Link",
        transporter
      );
      return { response: { success: true, errors: [] } };
    },
    forgotPasswordChange: async (_, { key, newPassword }, { redis }) => {
      const userId = (await redis.get(`${redisPassChangePrefix}${key}`)) || "";
      console.log(`${redisPassChangePrefix}${key}`);
      if (!userId) {
        return {
          response: {
            success: false,
            errors: [__ERRORCODES__.InvalidPasskey],
          },
        };
      }

      const update_password = await hash(newPassword, 10);

      const updatePromise = db
        .update(users)
        .set({
          password: update_password,
          locked: false,
        })
        .where(eq(users.id, userId));

      const deleteKeyPromise = redis.del(`${redisPassChangePrefix}${key}`);

      await Promise.all([updatePromise, deleteKeyPromise]);

      return { response: { success: true, errors: [] } };
    },
  },
};
