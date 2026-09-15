import { NextResponse } from "next/server";
import { ToolsPagination } from "@/types/tool";

export function successResponse<T>(
  data: T,
  status = 200,
  pagination?: ToolsPagination
) {
  const body: { data: T; pagination?: ToolsPagination } = { data };
  if (pagination) {
    body.pagination = pagination;
  }
  return NextResponse.json(body, { status });
}

export function errorResponse(
  message: string,
  status = 400,
  details?: unknown
) {
  const body: { error: { message: string; details?: unknown } } = {
    error: {
      message,
    },
  };
  if (details) {
    body.error.details = details;
  }
  return NextResponse.json(body, { status });
}
