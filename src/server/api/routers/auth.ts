import { TRPCError } from "@trpc/server";
import argon2 from "argon2";
import { loginSchema } from "../../../schema/auth.schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    // Find user in db
    console.log(input);
    const user = await ctx.prisma.user.findUnique({
      where: {
        username: input.username,
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Account not found.",
      });
    }
    // Verify passwords match
    console.log(user);
    const isValidPassword = await argon2.verify(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      user.hashedPassword,
      input.password
    );
    if (!isValidPassword) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid credentials.",
      });
    }
    // Set session
    ctx.session.user = {
      id: user.id,
      admin: false,
    };
    await ctx.session.save();
    return;
  }),
  logout: protectedProcedure.mutation(({ ctx }) => {
    // Destroy session
    ctx.session.destroy();
    return true;
  }),
});
