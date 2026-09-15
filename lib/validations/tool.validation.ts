import { z } from "zod";

export const toolQuerySchema = z.object({
  search: z.string().optional().default(""),
  category: z.string().optional().default("All"),
  pricing: z.string().optional().default("All"),
  platform: z.string().optional().default("All"),
  sort: z
    .enum(["popular", "rating", "newest", "a-z"])
    .optional()
    .default("popular"),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export type ToolQueryInput = z.infer<typeof toolQuerySchema>;
