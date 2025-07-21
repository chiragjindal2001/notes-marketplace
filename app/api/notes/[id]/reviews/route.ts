import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { supabase } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const noteId = Number.parseInt(params.id)
    if (isNaN(noteId)) {
      return createErrorResponse("Invalid note ID", [], 400)
    }

    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("note_id", noteId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to fetch reviews", [], 500)
    }

    return createResponse(reviews || [], "Reviews fetched successfully")
  } catch (error) {
    console.error("Get reviews error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const noteId = Number.parseInt(params.id)
    if (isNaN(noteId)) {
      return createErrorResponse("Invalid note ID", [], 400)
    }

    const { customer_name, customer_email, rating, comment, order_id } = await request.json()

    if (!customer_name || !customer_email || !rating || !comment || !order_id) {
      return createErrorResponse("All fields are required", [], 400)
    }

    if (rating < 1 || rating > 5) {
      return createErrorResponse("Rating must be between 1 and 5", [], 400)
    }

    // Verify that the customer purchased this note
    const { data: orderItem, error: orderError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order_id)
      .eq("note_id", noteId)
      .single()

    if (orderError || !orderItem) {
      return createErrorResponse("You can only review notes you have purchased", [], 403)
    }

    // Check if review already exists
    const { data: existingReview, error: existingError } = await supabase
      .from("reviews")
      .select("*")
      .eq("note_id", noteId)
      .eq("customer_email", customer_email)
      .eq("order_id", order_id)
      .single()

    if (existingReview) {
      return createErrorResponse("You have already reviewed this note", [], 400)
    }

    // Create review
    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        note_id: noteId,
        customer_name,
        customer_email,
        rating,
        comment,
        order_id,
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to create review", [], 500)
    }

    // Update note rating and review count
    const { data: allReviews } = await supabase.from("reviews").select("rating").eq("note_id", noteId)

    if (allReviews) {
      const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      await supabase
        .from("notes")
        .update({
          rating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
          review_count: allReviews.length,
        })
        .eq("id", noteId)
    }

    return createResponse(review, "Review created successfully", 201)
  } catch (error) {
    console.error("Create review error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
