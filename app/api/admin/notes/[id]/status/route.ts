import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import { supabase } from "@/lib/db"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const noteId = Number.parseInt(params.id)
    if (isNaN(noteId)) {
      return createErrorResponse("Invalid note ID", [], 400)
    }

    const { status } = await request.json()

    if (!["active", "draft", "inactive"].includes(status)) {
      return createErrorResponse("Invalid status", [], 400)
    }

    const { data: note, error } = await supabase
      .from("notes")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", noteId)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to update note status", [], 500)
    }

    return createResponse(note, "Note status updated successfully")
  } catch (error) {
    console.error("Update note status error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
