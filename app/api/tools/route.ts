import { NextRequest } from "next/server";
import { toolService } from "@/services/tool.service";
import { toolQuerySchema } from "@/lib/validations/tool.validation";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      pricing: searchParams.get("pricing") || undefined,
      platform: searchParams.get("platform") || undefined,
      sort: (searchParams.get("sort") as any) || undefined,
      page: searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : undefined,
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : undefined,
    };

    const validated = toolQuerySchema.safeParse(query);
    if (!validated.success) {
      return errorResponse("Invalid query parameters", 400);
    }

    const result = await toolService.getTools(validated.data);
    return successResponse(result.data, 200, result.pagination);
  } catch (error: any) {
    console.error("Error fetching tools:", error);
    return errorResponse("Internal Server Error while fetching tools", 500);
  }
}
