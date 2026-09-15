import { z } from "zod";

export const favoriteParamsSchema = z.object({
  toolId: z.string().min(1, "Tool ID is required"),
});

export type FavoriteParamsInput = z.infer<typeof favoriteParamsSchema>;
