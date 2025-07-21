import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { supabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { note_id, quantity = 1, session_id } = await request.json()

    if (!note_id || !session_id) {
      return createErrorResponse("Note ID and session ID are required", [], 400)
    }

    // Check if note exists and is active
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .select("id, title, price")
      .eq("id", note_id)
      .eq("status", "active")
      .single()

    if (noteError || !note) {
      return createErrorResponse("Note not found", [], 404)
    }

    // Check if item already exists in cart
    const { data: existingItem, error: existingError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("note_id", note_id)
      .eq("session_id", session_id)
      .single()

    if (existingItem) {
      // Update quantity
      const { data: updatedItem, error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id)
        .select()
        .single()

      if (updateError) {
        console.error("Database error:", updateError)
        return createErrorResponse("Failed to update cart item", [], 500)
      }

      return createResponse(updatedItem, "Cart updated successfully")
    } else {
      // Add new item
      const { data: newItem, error: insertError } = await supabase
        .from("cart_items")
        .insert({
          note_id,
          quantity,
          session_id,
        })
        .select()
        .single()

      if (insertError) {
        console.error("Database error:", insertError)
        return createErrorResponse("Failed to add item to cart", [], 500)
      }

      return createResponse(newItem, "Item added to cart successfully", 201)
    }
  } catch (error) {
    console.error("Add to cart error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
