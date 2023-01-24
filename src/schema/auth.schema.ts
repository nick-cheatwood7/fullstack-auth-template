import { z } from "zod";

const usernameSchema = z
  .string({ required_error: "Username is required" })
  .min(1, "Username is required");
const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(6, "Password must be at least 6 characters");

export const loginSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;
