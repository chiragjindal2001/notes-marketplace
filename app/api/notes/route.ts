import type { NextRequest } from "next/server"
import { createPaginatedResponse, createErrorResponse, getQueryParams } from "@/lib/utils/api"
import { supabase } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const params = getQueryParams(request.url)
    const { page, limit, subject, search, sort, min_price, max_price } = params

    let query = supabase.from("notes").select("*", { count: "exact" }).eq("status", "active")

    // Apply filters
    if (subject) {
      query = query.eq("subject", subject)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (min_price !== undefined) {
      query = query.gte("price", min_price)
    }

    if (max_price !== undefined) {
      query = query.lte("price", max_price)
    }

    // Apply sorting
    switch (sort) {
      case "rating":
        query = query.order("rating", { ascending: false })
        break
      case "price-low":
        query = query.order("price", { ascending: true })
        break
      case "price-high":
        query = query.order("price", { ascending: false })
        break
      case "newest":
        query = query.order("created_at", { ascending: false })
        break
      case "popular":
      default:
        query = query.order("download_count", { ascending: false })
        break
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data: notes, error, count } = await query

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to fetch notes", [], 500)
    }

    return createPaginatedResponse(notes || [], page, count || 0, limit, "Notes fetched successfully")
  } catch (error) {
    console.error("Get notes error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
