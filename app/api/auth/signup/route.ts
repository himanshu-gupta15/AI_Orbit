import { NextRequest } from "next/server";
import { signupSchema } from "@/lib/validations/auth.validation";
import { authService } from "@/services/auth.service";
import { setAuthCookie } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = signupSchema.safeParse(body);

    if (!validated.success) {
      const issue = validated.error.issues[0];
      return errorResponse(issue?.message || "Invalid input", 400);
    }

    const { user, token } = await authService.signup(validated.data);
    const response = successResponse({ user }, 201);
    return setAuthCookie(response, token);
  } catch (error: any) {
    console.error("Signup error:", error);
    return errorResponse(error.message || "Failed to create account", 400);
  }
}
