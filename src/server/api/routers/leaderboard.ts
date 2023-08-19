import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const leaderboardRouter = createTRPCRouter({
  setScore: publicProcedure
    .input(z.object({ time: z.number(), userId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.score.create({
        data: {
          time: input.time,
          userId: input.userId,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.score.findMany();
  }),
});
