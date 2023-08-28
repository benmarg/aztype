import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const leaderboardRouter = createTRPCRouter({
  setScore: publicProcedure
    .input(
      z.object({ time: z.number(), userId: z.string(), nickname: z.string() })
    )
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
      } else {
        return ctx.prisma.score.create({
          data: {
            time: input.time,
            userId: input.userId,
            nickname: input.nickname,
          },
        });
      }
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
  getScoreboard: publicProcedure
    .input(z.object({ time: z.number() }))
    .query(async ({ input, ctx }) => {
      const { time } = input;
      const fasterTimes = await ctx.prisma.score.findMany({
        where: {
          time: {
            lt: time,
          },
        },
        orderBy: {
          time: "desc",
        },
        take: 3,
      });
      const slowerTimes = await ctx.prisma.score.findMany({
        where: {
          time: {
            gt: time,
          },
        },
        orderBy: {
          time: "asc",
        },
        take: 3,
      });

      const rank = await ctx.prisma.score.count({
        where: {
          time: {
            lt: time,
          },
        },
      });

      console.log(
        "Faster Times:",
        fasterTimes,
        "Slower Times:",
        slowerTimes,
        "Slowest Rank:",
        rank
      );

      return { fasterTimes: fasterTimes.reverse(), slowerTimes, rank };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.score.findMany();
  }),
});
