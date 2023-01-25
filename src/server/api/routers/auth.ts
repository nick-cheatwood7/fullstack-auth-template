/* eslint-disable @typescript-eslint/ban-ts-comment */
import { TRPCError } from "@trpc/server";
import * as argon2 from "argon2";
import { loginSchema, registerSchema } from "../../../schema/auth.schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      // Create User in db
      try {
        const hashedPassword = await argon2.hash(input.password);
        const user = await ctx.prisma.user.create({
          data: {
            username: input.username,
            hashedPassword,
          },
        });
        return user;
      } catch (error) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Account already exists.",
        });
      }
    }),
  login: publicProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    // Find user in db
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
    ctx.req.session.destroy();
    return true;
  }),
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Account not found.",
      });
    }
    // @ts-ignore
    delete user.hashedPassword;
    return user;
  }),
});
