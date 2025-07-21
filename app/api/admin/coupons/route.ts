import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import { supabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const { code, type, value, min_amount, max_uses, expires_at } = await request.json()

    if (!code || !type || !value || !max_uses || !expires_at) {
      return createErrorResponse("All fields are required", [], 400)
    }

    if (!["percentage", "fixed"].includes(type)) {
      return createErrorResponse("Type must be percentage or fixed", [], 400)
    }

    const { data: coupon, error } = await supabase
      .from("coupons")
      .insert({
        code: code.toUpperCase(),
        type,
        value,
        min_amount: min_amount || 0,
        max_uses,
        used_count: 0,
        expires_at,
      })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return createErrorResponse("Coupon code already exists", [], 400)
      }
      console.error("Database error:", error)
      return createErrorResponse("Failed to create coupon", [], 500)
    }

    return createResponse(coupon, "Coupon created successfully", 201)
  } catch (error) {
    console.error("Create coupon error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const { data: coupons, error } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to fetch coupons", [], 500)
    }

    return createResponse(coupons || [], "Coupons fetched successfully")
  } catch (error) {
    console.error("Get coupons error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
