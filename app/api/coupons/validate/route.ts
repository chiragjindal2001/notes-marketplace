import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { supabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { code, total_amount } = await request.json()

    if (!code || !total_amount) {
      return createErrorResponse("Coupon code and total amount are required", [], 400)
    }

    // Find coupon
    const { data: coupon, error } = await supabase.from("coupons").select("*").eq("code", code.toUpperCase()).single()

    if (error || !coupon) {
      return createErrorResponse("Invalid coupon code", [], 404)
    }

    // Check if coupon is expired
    if (new Date(coupon.expires_at) < new Date()) {
      return createErrorResponse("Coupon has expired", [], 400)
    }

    // Check if coupon has reached max uses
    if (coupon.used_count >= coupon.max_uses) {
      return createErrorResponse("Coupon has reached maximum uses", [], 400)
    }

    // Check minimum amount
    if (total_amount < coupon.min_amount) {
      return createErrorResponse(`Minimum order amount is $${coupon.min_amount}`, [], 400)
    }

    // Calculate discount
    let discountAmount = 0
    if (coupon.type === "percentage") {
      discountAmount = (total_amount * coupon.value) / 100
    } else {
      discountAmount = Math.min(coupon.value, total_amount)
    }

    const finalAmount = Math.max(0, total_amount - discountAmount)

    return createResponse(
      {
        valid: true,
        coupon: {
          code: coupon.code,
          type: coupon.type,
          value: coupon.value,
        },
        discount_amount: discountAmount,
        final_amount: finalAmount,
      },
      "Coupon is valid",
    )
  } catch (error) {
    console.error("Validate coupon error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
