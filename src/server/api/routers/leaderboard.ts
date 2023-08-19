import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const leaderboardRouter = createTRPCRouter({
  setScore: publicProcedure
    .input(z.object({ score: z.number(), userId: z.string() }))
    .query(({ input, ctx }) => {
      return {
        greeting: `Hello ${input.score}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
