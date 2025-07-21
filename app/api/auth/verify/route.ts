import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)

    if (!user) {
      return createErrorResponse("Invalid or expired token", [], 401)
    }

    return createResponse({ user }, "Token is valid")
  } catch (error) {
    console.error("Token verification error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
