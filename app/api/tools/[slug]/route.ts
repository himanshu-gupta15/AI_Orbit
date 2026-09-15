import { NextRequest } from "next/server";
import { toolService } from "@/services/tool.service";
import { getAuthUserFromRequest } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return errorResponse("Slug is required", 400);
    }

    const user = await getAuthUserFromRequest(request);
    const tool = await toolService.getToolBySlug(slug, user?.id);

    if (!tool) {
      return errorResponse("Tool not found", 404);
    }

    return successResponse(tool);
  } catch (error: any) {
    console.error("Error fetching tool detail:", error);
    return errorResponse("Internal Server Error while fetching tool detail", 500);
  }
}
