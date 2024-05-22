import { hash } from "bcryptjs";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { Error, Resolvers } from "../../types/graphql";
import { userSchema } from "../../zod/userSchema";
import { eq, or } from "drizzle-orm";
import { createConfirmationLink } from "../../utils/createConfirmationLink";
import { sendMail } from "../../utils/sendMail";
import { __ERRORCODES__ } from "../../utils/errorHandler";

export const RegisterResolvers: Resolvers = {
  Mutation: {
    register: async (_, args, { redis, url, transporter }) => {
      const errors: Error[] = [];
      const { success, data, error } = await userSchema.safeParseAsync(args);
      if (!success || !data) {
        const a = JSON.parse(error.message);
        const er: Error[] = [];
        a.forEach((e: any) => {
          er.push({
            code: 400,
            path: e.path[0],
            message: e.message,
          });
        });
        return {
          response: {
            success: false,
            errors: er,
          },
        };
      }
      const { password, username, email } = data!;
      const hashed_password = await hash(password, 10);
      const existingUser = (
        await db
          .select()
          .from(users)
          .where(or(eq(users.email, email), eq(users.username, username)))
      )[0];

      if (existingUser) {
        if (existingUser.email === email) {
          errors.push(__ERRORCODES__.EmailAlreadyExists);
        }
        if (existingUser.username === username) {
          errors.push(__ERRORCODES__.UsernameAlreadyExists);
        }
        return { response: { success: false, errors } };
      }
      try {
        const data = (
          await db
            .insert(users)
            .values({
              username,
              email,
              password: hashed_password,
            })
            .returning({
              id: users.id,
              email: users.email,
              name: users.username,
            })
        )[0];
        const link = await createConfirmationLink(url, data.id, redis);
        await sendMail(
          data.email || "damodara.abhiram@gmail.com",
          `Hey ${data.name}! <a href="${link}">Click here to verify your account</a>`,
          "Seat of Joy Verification Link",
          transporter
        );
        return { response: { success: true, errors: [] } };
      } catch (error) {
        console.log(error);
        return {
          response: {
            success: false,
            errors: [__ERRORCODES__.InternalServerError],
          },
        };
      }
    },
  },
};
