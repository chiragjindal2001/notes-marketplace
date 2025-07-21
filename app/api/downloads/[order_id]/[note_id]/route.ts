import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { supabase } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { order_id: string; note_id: string } }) {
  try {
    const url = new URL(request.url)
    const token = url.searchParams.get("token")

    if (!token) {
      return createErrorResponse("Download token is required", [], 400)
    }

    // Verify token (simple implementation - use JWT in production)
    const decodedToken = Buffer.from(token, "base64").toString()
    const [tokenOrderId, tokenNoteId] = decodedToken.split(":")

    if (tokenOrderId !== params.order_id || tokenNoteId !== params.note_id) {
      return createErrorResponse("Invalid download token", [], 401)
    }

    // Verify order exists and is completed
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", params.order_id)
      .eq("status", "completed")
      .single()

    if (orderError || !order) {
      return createErrorResponse("Order not found or not completed", [], 404)
    }

    // Verify order item exists
    const { data: orderItem, error: itemError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", params.order_id)
      .eq("note_id", Number.parseInt(params.note_id))
      .single()

    if (itemError || !orderItem) {
      return createErrorResponse("Order item not found", [], 404)
    }

    // Get note file URL
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .select("note_file_url, title")
      .eq("id", Number.parseInt(params.note_id))
      .single()

    if (noteError || !note) {
      return createErrorResponse("Note not found", [], 404)
    }

    // Track download
    await supabase.from("downloads").insert({
      order_id: params.order_id,
      note_id: Number.parseInt(params.note_id),
      customer_email: order.customer_email,
      downloaded_at: new Date().toISOString(),
    })

    // Update download count
    await supabase
      .from("orders")
      .update({ download_count: (order.download_count || 0) + 1 })
      .eq("id", params.order_id)

    await supabase
      .from("notes")
      .update({ download_count: supabase.sql`download_count + 1` })
      .eq("id", Number.parseInt(params.note_id))

    return createResponse(
      {
        download_url: note.note_file_url,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        filename: `${note.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.pdf`,
      },
      "Download link generated successfully",
    )
  } catch (error) {
    console.error("Generate download link error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
