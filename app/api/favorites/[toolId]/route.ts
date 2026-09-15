import { NextRequest } from "next/server";
import { requireAuth, getAuthUserFromRequest } from "@/lib/auth";
import { favoriteService } from "@/services/favorite.service";
import { errorResponse, successResponse } from "@/lib/api-response";
import { favoriteParamsSchema } from "@/lib/validations/favorite.validation";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ toolId: string }> }
) {
  const user = await getAuthUserFromRequest(req);
  if (!user) {
    return successResponse({ favorited: false });
  }

  const { toolId } = await context.params;
  const favorited = await favoriteService.isToolFavoritedByUser(user.id, toolId);
  return successResponse({ favorited });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ toolId: string }> }
) {
  const auth = await requireAuth(req);
  if (auth.errorResponse) {
    return auth.errorResponse;
  }

  const { toolId } = await context.params;
  const validation = favoriteParamsSchema.safeParse({ toolId });
  if (!validation.success) {
    return errorResponse("Invalid tool ID", 400);
  }

  try {
    const result = await favoriteService.addFavorite(auth.user.id, toolId);
    return successResponse(result, 201);
  } catch (error: any) {
    console.error("Add favorite error:", error);
    return errorResponse(error.message || "Failed to favorite tool", 400);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ toolId: string }> }
) {
  const auth = await requireAuth(req);
  if (auth.errorResponse) {
    return auth.errorResponse;
  }

  const { toolId } = await context.params;
  const validation = favoriteParamsSchema.safeParse({ toolId });
  if (!validation.success) {
    return errorResponse("Invalid tool ID", 400);
  }

  try {
    const result = await favoriteService.removeFavorite(auth.user.id, toolId);
    return successResponse(result);
  } catch (error: any) {
    console.error("Remove favorite error:", error);
    return errorResponse(error.message || "Failed to remove favorite", 400);
  }
}
