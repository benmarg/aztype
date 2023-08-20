import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const leaderboardRouter = createTRPCRouter({
  setScore: publicProcedure
    .input(z.object({ time: z.number(), userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log("time", input.time);
      const previousScore = await ctx.prisma.score.findUnique({
        where: {
          userId: input.userId,
        },
      });

      if (previousScore) {
        return ctx.prisma.score.update({
          where: {
            userId: input.userId,
          },
          data: {
            time: input.time,
          },
        });
      }

      return ctx.prisma.score.create({
        data: {
          time: input.time,
          userId: input.userId,
        },
      });
    }),
  getScoreByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.score.findUnique({
        where: {
          userId: input.userId,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.score.findMany();
  }),
});
