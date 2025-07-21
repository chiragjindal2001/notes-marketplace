import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { authenticateAdmin } from "@/lib/auth"
import { supabase } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateAdmin(request)
    if (!user) {
      return createErrorResponse("Unauthorized", [], 401)
    }

    // Get total revenue
    const { data: revenueData } = await supabase.from("orders").select("total_amount").eq("status", "completed")

    const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

    // Get total notes count
    const { count: totalNotes } = await supabase.from("notes").select("*", { count: "exact", head: true })

    // Get total downloads
    const { data: downloadData } = await supabase.from("notes").select("download_count")

    const totalDownloads = downloadData?.reduce((sum, note) => sum + (note.download_count || 0), 0) || 0

    // Get recent orders count (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const { count: recentOrders } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo)

    // Get popular subjects
    const { data: subjectData } = await supabase.from("notes").select("subject, price")

    const subjectStats =
      subjectData?.reduce((acc: any, note) => {
        if (!acc[note.subject]) {
          acc[note.subject] = { note_count: 0, revenue: 0 }
        }
        acc[note.subject].note_count += 1
        return acc
      }, {}) || {}

    const popularSubjects = Object.entries(subjectStats).map(([subject, stats]: [string, any]) => ({
      subject,
      note_count: stats.note_count,
      revenue: stats.revenue,
    }))

    // Get monthly revenue (last 6 months)
    const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)
    const { data: monthlyData } = await supabase
      .from("orders")
      .select("total_amount, created_at")
      .eq("status", "completed")
      .gte("created_at", sixMonthsAgo.toISOString())

    const monthlyRevenue =
      monthlyData?.reduce((acc: any, order) => {
        const month = order.created_at.substring(0, 7) // YYYY-MM
        if (!acc[month]) {
          acc[month] = 0
        }
        acc[month] += order.total_amount
        return acc
      }, {}) || {}

    const monthlyRevenueArray = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue,
    }))

    return createResponse(
      {
        total_revenue: totalRevenue,
        total_notes: totalNotes || 0,
        total_downloads: totalDownloads,
        active_users: 1234, // Mock data - implement user tracking
        recent_orders: recentOrders || 0,
        popular_subjects: popularSubjects,
        monthly_revenue: monthlyRevenueArray,
      },
      "Dashboard stats fetched successfully",
    )
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
