import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import { createRazorpayRefund } from "@/lib/stripe"
import { supabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const { order_id, amount, reason } = await request.json()

    if (!order_id) {
      return createErrorResponse("Order ID is required", [], 400)
    }

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .eq("status", "completed")
      .single()

    if (orderError || !order) {
      return createErrorResponse("Order not found or not completed", [], 404)
    }

    if (!order.razorpay_payment_id) {
      return createErrorResponse("No payment ID found for this order", [], 400)
    }

    // Create refund in Razorpay
    const refund = await createRazorpayRefund(order.razorpay_payment_id, amount, {
      reason: reason || "Requested by admin",
      order_id: order_id,
    })

    // Update order status
    const { data: updatedOrder, error: updateError } = await supabase
      .from("orders")
      .update({
        status: "refunded",
        refund_details: refund,
        refunded_at: new Date().toISOString(),
      })
      .eq("id", order_id)
      .select()
      .single()

    if (updateError) {
      console.error("Order update error:", updateError)
      return createErrorResponse("Failed to update order status", [], 500)
    }

    return createResponse(
      {
        order: updatedOrder,
        refund,
      },
      "Refund processed successfully",
    )
  } catch (error) {
    console.error("Process refund error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
