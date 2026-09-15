import prisma from "@/lib/prisma";
import { Activity, Prisma } from "@prisma/client";

export class ActivityRepository {
  async create(data: {
    userId?: string | null;
    toolId?: string | null;
    action: string;
    metadata?: Record<string, any> | string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
  }): Promise<Activity> {
    const metadataString =
      typeof data.metadata === "object" && data.metadata !== null
        ? JSON.stringify(data.metadata)
        : (data.metadata as string | null | undefined);

    const createData: Prisma.ActivityUncheckedCreateInput = {
      userId: data.userId || null,
      toolId: data.toolId || null,
      action: data.action,
      metadata: metadataString || null,
      ipAddress: data.ipAddress || null,
      userAgent: data.userAgent || null,
    };

    return prisma.activity.create({
      data: createData,
    });
  }

  async findByUserId(userId: string, limit = 20): Promise<Activity[]> {
    return prisma.activity.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        tool: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
          },
        },
      },
    });
  }

  async findRecent(limit = 50): Promise<Activity[]> {
    return prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        tool: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
          },
        },
      },
    });
  }

  async count(where?: Prisma.ActivityWhereInput): Promise<number> {
    return prisma.activity.count(where ? { where } : undefined);
  }
}

export const activityRepository = new ActivityRepository();
