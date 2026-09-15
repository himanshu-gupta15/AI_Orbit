import { NextRequest } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return errorResponse("Not authenticated", 401);
    }
    return successResponse({ user });
  } catch (error: any) {
    console.error("Auth me error:", error);
    return errorResponse("Failed to fetch session", 500);
  }
}
