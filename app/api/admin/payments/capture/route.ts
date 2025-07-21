import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import razorpay from "@/lib/stripe"
import { supabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const { payment_id, amount } = await request.json()

    if (!payment_id) {
      return createErrorResponse("Payment ID is required", [], 400)
    }

    // Capture payment in Razorpay
    const capturedPayment = await razorpay.payments.capture(payment_id, Math.round(amount * 100), "INR")

    // Update order status if needed
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .update({
        status: "completed",
        payment_details: capturedPayment,
        completed_at: new Date().toISOString(),
      })
      .eq("razorpay_payment_id", payment_id)
      .select()
      .single()

    if (orderError) {
      console.error("Order update error:", orderError)
    }

    return createResponse(
      {
        payment: capturedPayment,
        order,
      },
      "Payment captured successfully",
    )
  } catch (error) {
    console.error("Capture payment error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
