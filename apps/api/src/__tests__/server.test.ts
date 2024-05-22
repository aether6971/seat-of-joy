import request_graphql from "supertest-graphql";
import request from "supertest";
import gql from "graphql-tag";
import { createServer } from "../server";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import Redis from "ioredis";
import { Express } from "express";
import { createConfirmationLink } from "../utils/createConfirmationLink";

const email = "bob@bob.com";
const password = "asdfsafsa4wfrads";
const username = "bob";

const registerMutation = (e: string, p: string, u: string) => gql`
mutation {
  register(email: "${e}", password: "${p}", username: "${u}"){
    path
    message
  }
}
`;

const loginMutation = (e: string, p: string, u: string) => gql`
mutation {
  login(email: "${e}", password: "${p}", username: "${u}"){
    path
    message
  }
}
`;

describe("Test Registration", () => {
  let app: Express;
  let redis: Redis;
  let id: string;

  beforeAll(async () => {
    const data = await createServer();
    app = data.app;
    redis = data.redis;
  });

  afterAll(async () => {
    await shutdown(redis);
  });

  test("Check data validation", async () => {
    const { data }: any = await request_graphql(app)
      .query(registerMutation("bob", "p", ""))
      .end();
    expect(data).toBeTruthy();
    expect(data.register).toHaveLength(3);
    expect(data.register).toEqual([
      { message: "This field has to be filled.", path: "username" },
      { message: "This is not a valid email.", path: "email" },
      { message: "This password is too short.", path: "password" },
    ]);
  });

  test("Check registration", async () => {
    const { data }: any = await request_graphql(app)
      .query(registerMutation(email, password, username))
      .end();
    expect(data.register).toBeTruthy();
    expect(data.register).toHaveLength(0);
  });

  test("Check if user is registered", async () => {
    const user = await db.select().from(users).where(eq(users.email, email));
    expect(user).toHaveLength(1);
    expect(user[0].email).toEqual(email);
    expect(user[0].password).not.toEqual(password);
    id = user[0].id;
  });

  test("Check if error is returned if user already exists", async () => {
    const { data }: any = await request_graphql(app)
      .query(registerMutation(email, password, username))
      .end();
    expect(data.register).toBeTruthy();
    expect(data.register).toHaveLength(2);
    expect(data.register).toEqual([
      {
        path: "email",
        message: "Email already exists",
      },
      {
        path: "username",
        message: "Username already exists",
      },
    ]);
  });

  test("Check if confirmation link works", async () => {
    const url = await createConfirmationLink(
      "http://localhost:4000",
      id,
      redis
    );
    const Url = new URL(url);
    const response = await request(app).get(Url.pathname);
    expect(response.text).toEqual("Email Verified");
  });
});

describe("Test Login", () => {
  let app: Express;
  let redis: Redis;
  let id: string;

  beforeAll(async () => {
    const data = await createServer();
    app = data.app;
    redis = data.redis;
  });

  afterAll(async () => {
    await shutdown(redis);
  });

  test("User not found", async () => {
    const { data }: any = await request_graphql(app)
      .query(loginMutation("asdf@gsadffs.com", "asdfsa", "asdfsa"))
      .end();
    expect(data.login).toBeTruthy();
    expect(data.login).toHaveLength(1);
    expect(data.login).toEqual([
      {
        path: "User",
        message: "User not found.",
      },
    ]);
  });

  test("Email not confirmed", async () => {
    await request_graphql(app)
      .query(registerMutation("bob2@bob.com", "bobisgreat@123", "bob2"))
      .end();

    const { data }: any = await request_graphql(app)
      .query(loginMutation("bob2@bob.com", "bobisgreat@123", "bob2"))
      .end();
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, "bob2@bob.com"));
    id = user[0].id;
    expect(data.login).toBeTruthy();
    expect(data.login).toHaveLength(1);
    expect(data.login).toEqual([
      {
        path: "User",
        message: "Please confirm your email.",
      },
    ]);
  });
  test("Login works properly", async () => {
    const url = await createConfirmationLink(
      "http://localhost:4000",
      id,
      redis
    );
    const Url = new URL(url);
    const response = await request(app).get(Url.pathname);
    console.log(response.text);
    expect(response.text).toEqual("Email Verified");
    const { data }: any = await request_graphql(app)
      .query(loginMutation("bob2@bob.com", "bobisgreat@123", "bob2"))
      .end();
    expect(data.login).toBeTruthy();
    expect(data.login).toHaveLength(0);
  });
});

afterAll(async () => {
  await db.delete(users);
});

async function shutdown(redis: Redis) {
  redis.disconnect(false);
}
