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

export const registerSchema = z
  .object({
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string({ required_error: "Passwords do not match" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
