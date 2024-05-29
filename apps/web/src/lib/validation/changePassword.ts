import * as z from "zod";

export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "This password is too short." })
    .max(255, { message: "This password is too long, max characters: 255" }),
});
