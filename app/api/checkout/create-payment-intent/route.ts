import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { createRazorpayOrder } from "@/lib/stripe"
import { supabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { items, customer_info, billing_address } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return createErrorResponse("Items are required", [], 400)
    }

    if (!customer_info?.email) {
      return createErrorResponse("Customer email is required", [], 400)
    }

    // Calculate total amount
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const { data: note, error } = await supabase
        .from("notes")
        .select("id, title, price")
        .eq("id", item.note_id)
        .eq("status", "active")
        .single()

      if (error || !note) {
        return createErrorResponse(`Note with ID ${item.note_id} not found`, [], 404)
      }

      const itemTotal = note.price * item.quantity
      totalAmount += itemTotal

      orderItems.push({
        note_id: note.id,
        title: note.title,
        price: note.price,
        quantity: item.quantity,
      })
    }

    // Create order in database
    const orderId = `ORD-${Date.now()}`
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        customer_email: customer_info.email,
        customer_name: `${customer_info.first_name} ${customer_info.last_name}`,
        total_amount: totalAmount,
        status: "pending",
        payment_method: "razorpay",
      })
      .select()
      .single()

    if (orderError) {
      console.error("Order creation error:", orderError)
      return createErrorResponse("Failed to create order", [], 500)
    }

    // Create order items
    const { error: itemsError } = await supabase.from("order_items").insert(
      orderItems.map((item) => ({
        order_id: orderId,
        note_id: item.note_id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    )

    if (itemsError) {
      console.error("Order items creation error:", itemsError)
      return createErrorResponse("Failed to create order items", [], 500)
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(
      totalAmount,
      "INR", // Default to INR, you can make this configurable
      orderId,
      {
        customer_email: customer_info.email,
        customer_name: `${customer_info.first_name} ${customer_info.last_name}`,
        order_id: orderId,
      },
    )

    // Update order with Razorpay order ID
    await supabase.from("orders").update({ razorpay_order_id: razorpayOrder.id }).eq("id", orderId)

    return createResponse(
      {
        razorpay_order_id: razorpayOrder.id,
        order_id: orderId,
        amount: Math.round(totalAmount * 100), // in paise
        currency: razorpayOrder.currency,
        key: process.env.RAZORPAY_KEY_ID,
        customer: {
          name: `${customer_info.first_name} ${customer_info.last_name}`,
          email: customer_info.email,
        },
      },
      "Razorpay order created successfully",
    )
  } catch (error) {
    console.error("Create Razorpay order error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
