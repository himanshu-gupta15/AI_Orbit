import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { favoriteService } from "@/services/favorite.service";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.errorResponse) {
    return auth.errorResponse;
  }

  try {
    const favorites = await favoriteService.getUserFavorites(auth.user.id);
    return successResponse({ favorites, total: favorites.length });
  } catch (error: any) {
    console.error("Get favorites error:", error);
    return errorResponse("Failed to fetch favorites", 500);
  }
}
