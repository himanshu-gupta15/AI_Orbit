import { NextRequest } from "next/server";
import { loginSchema } from "@/lib/validations/auth.validation";
import { authService } from "@/services/auth.service";
import { setAuthCookie } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.safeParse(body);

    if (!validated.success) {
      const issue = validated.error.issues[0];
      return errorResponse(issue?.message || "Invalid email or password", 400);
    }

    const { user, token } = await authService.login(validated.data);
    const response = successResponse({ user });
    return setAuthCookie(response, token);
  } catch (error: any) {
    console.error("Login error:", error);
    return errorResponse(error.message || "Invalid credentials", 401);
  }
}
