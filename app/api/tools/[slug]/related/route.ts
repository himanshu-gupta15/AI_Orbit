import { NextRequest } from "next/server";
import { toolService } from "@/services/tool.service";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return errorResponse("Slug is required", 400);
    }

    const related = await toolService.getRelatedTools(slug);
    return successResponse(related);
  } catch (error: any) {
    console.error("Error fetching related tools:", error);
    return errorResponse("Internal Server Error while fetching related tools", 500);
  }
}
