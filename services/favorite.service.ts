import { favoriteRepository } from "../repositories/favorite.repository";
import { toolRepository } from "../repositories/tool.repository";
import { toolService } from "./tool.service";

import { activityService } from "./activity.service";

export class FavoriteService {
  async addFavorite(userId: string, toolId: string) {
    // Verify tool exists
    const tool = await toolRepository.findById(toolId);
    if (!tool) {
      throw new Error("Tool not found");
    }

    // Check if already favorited
    const existing = await favoriteRepository.findByUserAndTool(userId, toolId);
    if (existing) {
      return { favorited: true, message: "Tool already favorited" };
    }

    await favoriteRepository.create(userId, toolId);

    // Asynchronously log activity
    activityService.logActivity({
      userId,
      toolId,
      action: "FAVORITE_TOOL",
      metadata: { toolName: tool.name, slug: tool.slug, category: tool.category },
    });

    return { favorited: true, message: "Tool saved to favorites" };
  }

  async removeFavorite(userId: string, toolId: string) {
    const existing = await favoriteRepository.findByUserAndTool(userId, toolId);
    if (!existing) {
      return { favorited: false, message: "Tool was not in favorites" };
    }

    await favoriteRepository.delete(userId, toolId);

    // Asynchronously log activity
    activityService.logActivity({
      userId,
      toolId,
      action: "UNFAVORITE_TOOL",
    });

    return { favorited: false, message: "Tool removed from favorites" };
  }

  async getUserFavorites(userId: string) {
    const favorites = await favoriteRepository.getUserFavorites(userId);
    return favorites.map((fav) => ({
      favoriteId: fav.id,
      savedAt: fav.createdAt,
      tool: toolService.parseTool(fav.tool),
    }));
  }

  async isToolFavoritedByUser(userId: string, toolId: string): Promise<boolean> {
    return favoriteRepository.isToolFavoritedByUser(userId, toolId);
  }
}

export const favoriteService = new FavoriteService();
