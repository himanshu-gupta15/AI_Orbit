import prisma from "@/lib/prisma";
import { Favorite, Tool } from "@prisma/client";

export class FavoriteRepository {
  async findByUserAndTool(
    userId: string,
    toolId: string
  ): Promise<Favorite | null> {
    return prisma.favorite.findUnique({
      where: {
        userId_toolId: {
          userId,
          toolId,
        },
      },
    });
  }

  async create(userId: string, toolId: string): Promise<Favorite> {
    return prisma.favorite.create({
      data: {
        userId,
        toolId,
      },
    });
  }

  async delete(userId: string, toolId: string): Promise<Favorite | null> {
    try {
      return await prisma.favorite.delete({
        where: {
          userId_toolId: {
            userId,
            toolId,
          },
        },
      });
    } catch {
      return null;
    }
  }

  async getUserFavorites(userId: string) {
    return prisma.favorite.findMany({
      where: { userId },
      include: {
        tool: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async isToolFavoritedByUser(userId: string, toolId: string): Promise<boolean> {
    const fav = await this.findByUserAndTool(userId, toolId);
    return !!fav;
  }
}

export const favoriteRepository = new FavoriteRepository();
