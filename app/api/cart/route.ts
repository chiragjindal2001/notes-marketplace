import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { supabase } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const sessionId = url.searchParams.get("session_id")

    if (!sessionId) {
      return createErrorResponse("Session ID is required", [], 400)
    }

    const { data: cartItems, error } = await supabase
      .from("cart_items")
      .select(`
        *,
        notes:note_id (
          id,
          title,
          price,
          preview_image
        )
      `)
      .eq("session_id", sessionId)

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to fetch cart items", [], 500)
    }

    return createResponse(cartItems || [], "Cart items fetched successfully")
  } catch (error) {
    console.error("Get cart error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const sessionId = url.searchParams.get("session_id")

    if (!sessionId) {
      return createErrorResponse("Session ID is required", [], 400)
    }

    const { error } = await supabase.from("cart_items").delete().eq("session_id", sessionId)

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to clear cart", [], 500)
    }

    return createResponse(null, "Cart cleared successfully")
  } catch (error) {
    console.error("Clear cart error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
