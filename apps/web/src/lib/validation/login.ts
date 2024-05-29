import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(255, { message: "This email is too long, max characters: 255" })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "This password is too short." })
    .max(255, { message: "This password is too long, max characters: 255" }),
});
