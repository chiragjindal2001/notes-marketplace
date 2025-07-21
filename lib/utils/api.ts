import { NextResponse } from "next/server"

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  errors?: string[]
  pagination?: {
    current_page: number
    total_pages: number
    total_items: number
    items_per_page: number
  }
}

export function createResponse<T>(data: T, message?: string, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status },
  )
}

export function createErrorResponse(message: string, errors?: string[], status = 400): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status },
  )
}

export function createPaginatedResponse<T>(
  items: T[],
  currentPage: number,
  totalItems: number,
  itemsPerPage: number,
  message?: string,
): NextResponse<ApiResponse<{ items: T[] }>> {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return NextResponse.json({
    success: true,
    message,
    data: { items },
    pagination: {
      current_page: currentPage,
      total_pages: totalPages,
      total_items: totalItems,
      items_per_page: itemsPerPage,
    },
  })
}

export function getQueryParams(url: string) {
  const urlObj = new URL(url)
  const params = new URLSearchParams(urlObj.search)

  return {
    page: Number.parseInt(params.get("page") || "1"),
    limit: Math.min(Number.parseInt(params.get("limit") || "12"), 50), // Max 50 items
    subject: params.get("subject"),
    search: params.get("search"),
    sort: params.get("sort") || "popular",
    min_price: params.get("min_price") ? Number.parseFloat(params.get("min_price")!) : undefined,
    max_price: params.get("max_price") ? Number.parseFloat(params.get("max_price")!) : undefined,
  }
}
