import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { supabase } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const noteId = Number.parseInt(params.id)

    if (isNaN(noteId)) {
      return createErrorResponse("Invalid note ID", [], 400)
    }

    // Get note details
    const { data: note, error: noteError } = await supabase
      .from("notes")
      .select("*")
      .eq("id", noteId)
      .eq("status", "active")
      .single()

    if (noteError || !note) {
      return createErrorResponse("Note not found", [], 404)
    }

    // Get reviews for this note
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("*")
      .eq("note_id", noteId)
      .order("created_at", { ascending: false })
      .limit(10)

    if (reviewsError) {
      console.error("Reviews fetch error:", reviewsError)
    }

    return createResponse(
      {
        note: {
          ...note,
          author: {
            name: "Alex Johnson",
            credentials: "Mathematics Major, GPA 3.9",
            experience: "5+ years tutoring experience",
          },
        },
        reviews: reviews || [],
      },
      "Note details fetched successfully",
    )
  } catch (error) {
    console.error("Get note error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
