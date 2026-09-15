import prisma from "@/lib/prisma";
import { ToolSubmission, Prisma } from "@prisma/client";

export class SubmissionRepository {
  async create(
    userId: string,
    data: {
      name: string;
      websiteUrl: string;
      description: string;
      category: string;
      pricing: string;
    }
  ): Promise<ToolSubmission> {
    const createData: Prisma.ToolSubmissionUncheckedCreateInput = {
      name: data.name,
      websiteUrl: data.websiteUrl,
      description: data.description,
      category: data.category,
      pricing: data.pricing,
      status: "PENDING",
      userId,
    };
    return prisma.toolSubmission.create({ data: createData });
  }

  async findByUser(userId: string): Promise<ToolSubmission[]> {
    return prisma.toolSubmission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}

export const submissionRepository = new SubmissionRepository();
