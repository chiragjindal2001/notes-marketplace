import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { verifyRazorpayPayment, fetchRazorpayPayment } from "@/lib/stripe"
import { supabase } from "@/lib/db"
import { sendDownloadEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order_id) {
      return createErrorResponse("All Razorpay payment details are required", [], 400)
    }

    // Verify payment signature
    const isValidSignature = verifyRazorpayPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    if (!isValidSignature) {
      return createErrorResponse("Invalid payment signature", [], 400)
    }

    // Fetch payment details from Razorpay
    const paymentDetails = await fetchRazorpayPayment(razorpay_payment_id)

    if (paymentDetails.status !== "captured") {
      return createErrorResponse("Payment not captured", [], 400)
    }

    // Update order status
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .update({
        status: "completed",
        razorpay_payment_id: razorpay_payment_id,
        payment_details: paymentDetails,
        completed_at: new Date().toISOString(),
      })
      .eq("id", order_id)
      .eq("razorpay_order_id", razorpay_order_id)
      .select()
      .single()

    if (orderError) {
      console.error("Order update error:", orderError)
      return createErrorResponse("Failed to update order", [], 500)
    }

    // Get order items with note details
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select(`
        *,
        notes:note_id (
          id,
          title,
          note_file_url
        )
      `)
      .eq("order_id", order_id)

    if (itemsError) {
      console.error("Order items fetch error:", itemsError)
      return createErrorResponse("Failed to fetch order items", [], 500)
    }

    // Generate download links and send email
    try {
      const downloadItems =
        orderItems?.map((item) => ({
          title: item.title,
          downloadUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/downloads/${order_id}/${item.note_id}?token=${generateDownloadToken(order_id, item.note_id)}`,
        })) || []

      await sendDownloadEmail(order.customer_email, order.customer_name, downloadItems)
    } catch (emailError) {
      console.error("Email sending error:", emailError)
      // Don't fail the request if email fails
    }

    return createResponse(
      {
        order,
        status: "completed",
        payment_id: razorpay_payment_id,
      },
      "Payment confirmed successfully",
    )
  } catch (error) {
    console.error("Confirm payment error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}

function generateDownloadToken(orderId: string, noteId: number): string {
  // Simple token generation - use JWT or more secure method in production
  return Buffer.from(`${orderId}:${noteId}:${Date.now()}`).toString("base64")
}
