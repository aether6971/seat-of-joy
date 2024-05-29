import * as z from "zod";

export const forgotPasswordESchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(255, { message: "This email is too long, max characters: 255" })
    .email("This is not a valid email."),
});
