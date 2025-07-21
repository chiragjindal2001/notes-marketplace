import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import { supabase } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { order_id: string } }) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          id,
          note_id,
          title,
          price,
          quantity,
          notes:note_id (
            id,
            title,
            preview_image
          )
        )
      `)
      .eq("id", params.order_id)
      .single()

    if (error || !order) {
      return createErrorResponse("Order not found", [], 404)
    }

    return createResponse(order, "Order details fetched successfully")
  } catch (error) {
    console.error("Get order error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
