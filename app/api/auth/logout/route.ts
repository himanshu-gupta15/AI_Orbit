import { clearAuthCookie } from "@/lib/auth";
import { successResponse } from "@/lib/api-response";

export async function POST() {
  const response = successResponse({ message: "Successfully logged out" });
  clearAuthCookie(response);
  return response;
}
