import { json, urlencoded } from "body-parser";
import express, { Request, type Express, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { createSchema, createYoga } from "graphql-yoga";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { resolvers } from "./modules";
import { Redis } from "ioredis";
import { users } from "./db/schema";
import { db } from "./db/db";
import { eq, or } from "drizzle-orm/sql";
import session from "express-session";
import {
  __prod__,
  redisEmailVerifyPrefix,
  redisSessionPrefix,
} from "./constants";
import RedisStore from "connect-redis";
import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
import { permissions } from "./utils/middleware";
import nodemailer from "nodemailer";
import { rateLimit } from "express-rate-limit";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { createConfirmationLink } from "./utils/createConfirmationLink";
import { Session } from "./types/contextType";

export const createServer = async (): Promise<{
  app: Express;
  redis: Redis;
}> => {
  const app = express();
  const redis = new Redis();
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "damodara.abhiram@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        const { id, displayName, emails } = profile;
        let email: {
          value: string;
          verified: boolean;
        } = {
          value: "",
          verified: false,
        };
        if (emails) {
          email = emails[0];
        }
        const user = (
          await db
            .select()
            .from(users)
            .where(or(eq(users.googleId, id), eq(users.email, email.value)))
        )[0];
        if (!user) {
          console.log("yeah?");
          await db.insert(users).values({
            email: email.value,
            googleId: id,
            username: displayName,
            verified: true,
          });
        } else if (!user.googleId) {
          await db.update(users).set({
            googleId: id,
            verified: true,
          });
        }
        return cb(null, { userId: id });
      }
    )
  );

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(limiter)
    .use(
      session({
        store: new RedisStore({
          client: redis,
          prefix: redisSessionPrefix,
        }),
        name: "nid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: __prod__,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
      })
    )
    .use(
      cors({
        credentials: true,
        origin: "http://localhost:3000",
      })
    )
    .use(passport.initialize());

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/graphql",
      session: false,
    }),
    function (req, res) {
      console.log((req as any).user);
      (req.session as Session).userId = (req.user as any).userId;
      console.log((req.session as any).userId);
      res.redirect("http://localhost:4000/graphql");
    }
  );
  app.get("/confirm/:id", async (req, res) => {
    const { id } = req.params;
    const userId = await redis.get(`${redisEmailVerifyPrefix}${id}`);
    if (userId) {
      await db
        .update(users)
        .set({ verified: true })
        .where(eq(users.id, userId));
      res.send("Email Verified");
    } else {
      res.status(500);
      res.send("Invalid");
    }
  });

  const typesArray = loadFilesSync("src/modules/**/*.graphql", {
    extensions: ["graphql"],
  });

  const typeDefs = mergeTypeDefs(typesArray);

  const yoga = createYoga({
    schema: createSchema({ typeDefs, resolvers }),
    context: (context) => {
      const url = new URL(context.request.url);
      return {
        ...context,
        transporter,
        redis,
        url: url.protocol + "//" + url.host,
        session: ((context as any).req as Request).session,
      };
    },
    plugins: [useGraphQLMiddleware([permissions])],
  });
  app.use(yoga.graphqlEndpoint, yoga);

  return { app, redis };
};
