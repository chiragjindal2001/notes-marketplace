import type { NextRequest } from "next/server"
import { headers } from "next/headers"
import stripe from "@/lib/stripe"
import { supabase } from "@/lib/db"
import { sendDownloadEmail } from "@/lib/email"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get("stripe-signature")!

    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return new Response("Webhook signature verification failed", { status: 400 })
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object
        const orderId = paymentIntent.metadata.order_id

        if (orderId) {
          // Update order status
          const { data: order, error: orderError } = await supabase
            .from("orders")
            .update({ status: "paid" })
            .eq("id", orderId)
            .select()

          if (orderError) {
            console.error("Error updating order status:", orderError)
            return new Response("Error updating order status", { status: 500 })
          }

          // Send download email
          const { error: emailError } = await sendDownloadEmail(orderId)

          if (emailError) {
            console.error("Error sending download email:", emailError)
            return new Response("Error sending download email", { status: 500 })
          }
        }
        break
      // Handle other event types here
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return new Response("Success", { status: 200 })
  } catch (err) {
    console.error("Error processing webhook:", err)
    return new Response("Error processing webhook", { status: 500 })
  }
}
