import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import { supabase } from "@/lib/db"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const noteId = Number.parseInt(params.id)
    if (isNaN(noteId)) {
      return createErrorResponse("Invalid note ID", [], 400)
    }

    const updates = await request.json()

    const { data: note, error } = await supabase
      .from("notes")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", noteId)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to update note", [], 500)
    }

    return createResponse(note, "Note updated successfully")
  } catch (error) {
    console.error("Update note error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const noteId = Number.parseInt(params.id)
    if (isNaN(noteId)) {
      return createErrorResponse("Invalid note ID", [], 400)
    }

    const { error } = await supabase.from("notes").delete().eq("id", noteId)

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to delete note", [], 500)
    }

    return createResponse(null, "Note deleted successfully")
  } catch (error) {
    console.error("Delete note error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
