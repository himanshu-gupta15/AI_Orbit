import { toolService } from "@/services/tool.service";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const categories = await toolService.getCategories();
    return successResponse(categories);
  } catch (error: any) {
    console.error("Error fetching categories:", error);
    return errorResponse("Internal Server Error while fetching categories", 500);
  }
}
