import type { NextRequest } from "next/server"
import { headers } from "next/headers"
import crypto from "crypto"
import { supabase } from "@/lib/db"
import { sendDownloadEmail } from "@/lib/email"

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get("x-razorpay-signature")!

    // Verify webhook signature
    const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex")

    if (expectedSignature !== signature) {
      console.error("Webhook signature verification failed")
      return new Response("Webhook signature verification failed", { status: 400 })
    }

    const event = JSON.parse(body)

    switch (event.event) {
      case "payment.captured":
        const payment = event.payload.payment.entity
        const orderId = payment.notes?.order_id

        if (orderId) {
          // Update order status
          const { data: order, error: orderError } = await supabase
            .from("orders")
            .update({
              status: "completed",
              razorpay_payment_id: payment.id,
              payment_details: payment,
              completed_at: new Date().toISOString(),
            })
            .eq("razorpay_order_id", payment.order_id)
            .select()
            .single()

          if (orderError) {
            console.error("Error updating order status:", orderError)
            return new Response("Error updating order status", { status: 500 })
          }

          // Get order items for download email
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
            .eq("order_id", order.id)

          if (!itemsError && orderItems) {
            const downloadItems = orderItems.map((item) => ({
              title: item.title,
              downloadUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/downloads/${order.id}/${item.note_id}?token=${generateDownloadToken(order.id, item.note_id)}`,
            }))

            try {
              await sendDownloadEmail(order.customer_email, order.customer_name, downloadItems)
            } catch (emailError) {
              console.error("Error sending download email:", emailError)
            }
          }
        }
        break

      case "payment.failed":
        const failedPayment = event.payload.payment.entity
        const failedOrderId = failedPayment.notes?.order_id

        if (failedOrderId) {
          await supabase
            .from("orders")
            .update({
              status: "failed",
              razorpay_payment_id: failedPayment.id,
              payment_details: failedPayment,
            })
            .eq("razorpay_order_id", failedPayment.order_id)
        }
        break

      case "refund.created":
        const refund = event.payload.refund.entity
        const refundOrderId = refund.notes?.order_id

        if (refundOrderId) {
          await supabase
            .from("orders")
            .update({
              status: "refunded",
              refund_details: refund,
            })
            .eq("razorpay_payment_id", refund.payment_id)
        }
        break

      default:
        console.log(`Unhandled event type ${event.event}`)
    }

    return new Response("Success", { status: 200 })
  } catch (err) {
    console.error("Error processing webhook:", err)
    return new Response("Error processing webhook", { status: 500 })
  }
}

function generateDownloadToken(orderId: string, noteId: number): string {
  return Buffer.from(`${orderId}:${noteId}:${Date.now()}`).toString("base64")
}
