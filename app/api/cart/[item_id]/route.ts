import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { supabase } from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: { item_id: string } }) {
  try {
    const itemId = Number.parseInt(params.item_id)
    if (isNaN(itemId)) {
      return createErrorResponse("Invalid item ID", [], 400)
    }

    const { quantity } = await request.json()

    if (quantity < 1) {
      return createErrorResponse("Quantity must be at least 1", [], 400)
    }

    const { data: updatedItem, error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", itemId)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to update cart item", [], 500)
    }

    return createResponse(updatedItem, "Cart item updated successfully")
  } catch (error) {
    console.error("Update cart item error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { item_id: string } }) {
  try {
    const itemId = Number.parseInt(params.item_id)
    if (isNaN(itemId)) {
      return createErrorResponse("Invalid item ID", [], 400)
    }

    const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to remove cart item", [], 500)
    }

    return createResponse(null, "Cart item removed successfully")
  } catch (error) {
    console.error("Remove cart item error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
