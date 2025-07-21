import type { NextRequest } from "next/server"
import { createPaginatedResponse, createErrorResponse, getQueryParams } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import { supabase } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    const params = getQueryParams(request.url)
    const { page, limit, search } = params

    const url = new URL(request.url)
    const status = url.searchParams.get("status")
    const dateFrom = url.searchParams.get("date_from")
    const dateTo = url.searchParams.get("date_to")

    let query = supabase.from("orders").select(
      `
        *,
        order_items (
          id,
          note_id,
          title,
          price,
          quantity
        )
      `,
      { count: "exact" },
    )

    // Apply filters
    if (status) {
      query = query.eq("status", status)
    }

    if (search) {
      query = query.or(`customer_email.ilike.%${search}%,customer_name.ilike.%${search}%,id.ilike.%${search}%`)
    }

    if (dateFrom) {
      query = query.gte("created_at", dateFrom)
    }

    if (dateTo) {
      query = query.lte("created_at", dateTo)
    }

    // Apply pagination and sorting
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.order("created_at", { ascending: false }).range(from, to)

    const { data: orders, error, count } = await query

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to fetch orders", [], 500)
    }

    return createPaginatedResponse(orders || [], page, count || 0, limit, "Orders fetched successfully")
  } catch (error) {
    console.error("Get orders error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
