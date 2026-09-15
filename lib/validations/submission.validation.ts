import { z } from "zod";

export const submissionSchema = z.object({
  name: z
    .string({ required_error: "Tool name is required" })
    .min(2, "Tool name must be at least 2 characters")
    .max(80, "Tool name must not exceed 80 characters")
    .trim(),
  websiteUrl: z
    .string({ required_error: "Website URL is required" })
    .url("Invalid URL format. Must start with http:// or https://")
    .trim(),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters")
    .trim(),
  category: z
    .string({ required_error: "Category is required" })
    .min(2, "Category is required"),
  pricing: z
    .enum(["Free", "Freemium", "Paid"], {
      errorMap: () => ({ message: "Pricing must be Free, Freemium, or Paid" }),
    }),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;
