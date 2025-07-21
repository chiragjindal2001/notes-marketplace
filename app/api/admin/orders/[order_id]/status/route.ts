import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import { supabase } from "@/lib/db"

export async function PATCH(request: NextRequest, { params }: { params: { order_id: string } }) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const { status } = await request.json()

    if (!["pending", "completed", "failed", "refunded"].includes(status)) {
      return createErrorResponse("Invalid status", [], 400)
    }

    const updateData: any = { status }
    if (status === "completed") {
      updateData.completed_at = new Date().toISOString()
    }

    const { data: order, error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", params.order_id)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to update order status", [], 500)
    }

    return createResponse(order, "Order status updated successfully")
  } catch (error) {
    console.error("Update order status error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
