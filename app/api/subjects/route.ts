import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { supabase } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get subjects with note counts
    const { data: subjectData, error } = await supabase.from("notes").select("subject").eq("status", "active")

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to fetch subjects", [], 500)
    }

    // Count notes per subject
    const subjectCounts =
      subjectData?.reduce((acc: any, note) => {
        acc[note.subject] = (acc[note.subject] || 0) + 1
        return acc
      }, {}) || {}

    // Subject icons mapping
    const subjectIcons: { [key: string]: string } = {
      Mathematics: "📐",
      Physics: "⚛️",
      Chemistry: "🧪",
      Biology: "🧬",
      "Computer Science": "💻",
      Engineering: "⚙️",
      Economics: "📊",
      Psychology: "🧠",
    }

    const subjects = Object.entries(subjectCounts).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      note_count: count,
      icon: subjectIcons[name] || "📚",
    }))

    return createResponse({ subjects }, "Subjects fetched successfully")
  } catch (error) {
    console.error("Get subjects error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
