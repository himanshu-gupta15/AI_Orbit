import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const AUTH_COOKIE_NAME = "ai_orbit_token";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "ai_orbit_jwt_super_secret_production_key_32_characters_minimum";

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: string;
}

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: string;
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Password comparison
export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

// Sign JWT token
export function signToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// Verify JWT token
export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch {
    return null;
  }
}

// Set HTTP-Only Cookie
export function setAuthCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
  return response;
}

// Clear HTTP-Only Cookie
export function clearAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
export const removeAuthCookie = clearAuthCookie;

// Read and verify authenticated user from NextRequest
export async function getAuthUserFromRequest(
  request: NextRequest
): Promise<SafeUser | null> {
  try {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload || !payload.userId) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        role: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}

// Guard helper for protected APIs
export async function requireAuth(request: NextRequest): Promise<
  | { user: SafeUser; errorResponse: null }
  | { user: null; errorResponse: NextResponse }
> {
  const user = await getAuthUserFromRequest(request);

  if (!user) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { error: { message: "Authentication required to access this resource" } },
        { status: 401 }
      ),
    };
  }

  return { user, errorResponse: null };
}
