import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { generateToken, verifyPassword } from "@/lib/auth"

// Mock admin user - replace with database lookup
const ADMIN_USER = {
  id: 1,
  username: "admin",
  password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
  role: "admin" as const,
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return createErrorResponse("Username and password are required", [], 400)
    }

    // Verify credentials
    if (username !== ADMIN_USER.username) {
      return createErrorResponse("Invalid credentials", [], 401)
    }

    const isValidPassword = await verifyPassword(password, ADMIN_USER.password)
    if (!isValidPassword) {
      return createErrorResponse("Invalid credentials", [], 401)
    }

    // Generate JWT token
    const token = generateToken({
      id: ADMIN_USER.id,
      username: ADMIN_USER.username,
      role: ADMIN_USER.role,
    })

    return createResponse(
      {
        token,
        user: {
          id: ADMIN_USER.id,
          username: ADMIN_USER.username,
          role: ADMIN_USER.role,
        },
      },
      "Login successful",
    )
  } catch (error) {
    console.error("Login error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
