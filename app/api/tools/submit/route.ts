import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth";
import { submissionSchema } from "@/lib/validations/submission.validation";
import { submissionService } from "@/services/submission.service";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth.errorResponse) {
    return auth.errorResponse;
  }

  try {
    const body = await req.json();

    const validated = submissionSchema.safeParse(body);
    if (!validated.success) {
      const issue = validated.error.issues[0];
      return errorResponse(issue?.message || "Invalid submission data", 400);
    }

    const submission = await submissionService.submitTool(
      auth.user.id,
      validated.data
    );

    return successResponse(
      {
        message: "Tool submitted successfully for review",
        submissionId: submission.id,
      },
      201
    );
  } catch (error: any) {
    console.error("Tool submission error:", error);
    return errorResponse("Failed to submit tool", 500);
  }
}
