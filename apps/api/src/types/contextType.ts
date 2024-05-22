import { Redis } from "ioredis";
import { Request, Response } from "express";
import { YogaInitialContext } from "graphql-yoga";
import { Session as SessionType } from "express-session";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export type Context = YogaInitialContext & {
  req: Request;
  res: Response;
  redis: Redis;
  url: string;
  session: Session;
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
};

export type Session = SessionType & {
  userId: string;
};
