import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import { supabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const formData = await request.formData()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const subject = formData.get("subject") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const tags = (formData.get("tags") as string)?.split(",").map((tag) => tag.trim()) || []
    const features = JSON.parse((formData.get("features") as string) || "[]")
    const topics = JSON.parse((formData.get("topics") as string) || "[]")

    // Handle file uploads (you'll need to implement file upload to your storage)
    const noteFile = formData.get("note_file") as File
    const previewImage = formData.get("preview_image") as File

    // For demo purposes, using placeholder URLs
    const noteFileUrl = "/uploads/notes/sample.pdf"
    const previewImageUrl = "/uploads/previews/sample.jpg"
    const samplePages = ["/uploads/samples/sample1.jpg", "/uploads/samples/sample2.jpg"]

    const { data: note, error } = await supabase
      .from("notes")
      .insert({
        title,
        description,
        subject,
        price,
        tags,
        features,
        topics,
        note_file_url: noteFileUrl,
        preview_image: previewImageUrl,
        sample_pages: samplePages,
        rating: 0,
        download_count: 0,
        review_count: 0,
        status: "active",
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to create note", [], 500)
    }

    return createResponse(note, "Note created successfully", 201)
  } catch (error) {
    console.error("Create note error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const { data: notes, error } = await supabase.from("notes").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to fetch notes", [], 500)
    }

    return createResponse(notes, "Notes fetched successfully")
  } catch (error) {
    console.error("Get admin notes error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
