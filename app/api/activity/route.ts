import { NextRequest } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth";
import { activityService } from "@/services/activity.service";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    const body = await req.json().catch(() => ({}));

    const { action, toolId, metadata } = body;

    if (!action || typeof action !== "string") {
      return errorResponse("Action is required", 400);
    }

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      null;

    const userAgent = req.headers.get("user-agent") || null;

    const activity = await activityService.logActivity({
      userId: user?.id || null,
      toolId: toolId || null,
      action: action.toUpperCase(),
      metadata: metadata || null,
      ipAddress,
      userAgent,
    });

    return successResponse({ recorded: true, id: activity?.id });
  } catch (error: any) {
    console.error("Activity logging error:", error);
    return errorResponse("Failed to record activity", 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUserFromRequest(req);
    if (!user) {
      return errorResponse("Authentication required", 401);
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

    const activities = await activityService.getUserActivities(user.id, limit);
    return successResponse({ activities, count: activities.length });
  } catch (error: any) {
    console.error("Get user activities error:", error);
    return errorResponse("Failed to fetch activities", 500);
  }
}
