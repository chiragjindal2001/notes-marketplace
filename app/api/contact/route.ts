import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { sendContactEmail } from "@/lib/email"
import { supabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return createErrorResponse("All fields are required", [], 400)
    }

    // Save contact message to database
    const { data: contact, error } = await supabase
      .from("contacts")
      .insert({
        name,
        email,
        subject,
        message,
        status: "new",
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return createErrorResponse("Failed to save contact message", [], 500)
    }

    // Send email notification
    try {
      await sendContactEmail(name, email, subject, message)
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      // Don't fail the request if email fails
    }

    return createResponse(contact, "Contact message sent successfully", 201)
  } catch (error) {
    console.error("Contact form error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
