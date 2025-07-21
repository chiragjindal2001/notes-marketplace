import type { NextRequest } from "next/server"
import { createResponse, createErrorResponse } from "@/lib/utils/api"
import { verifyRazorpayPayment } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return createErrorResponse("All payment verification parameters are required", [], 400)
    }

    const isValid = verifyRazorpayPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature)

    return createResponse(
      {
        valid: isValid,
      },
      isValid ? "Payment signature is valid" : "Payment signature is invalid",
    )
  } catch (error) {
    console.error("Payment verification error:", error)
    return createErrorResponse("Internal server error", [], 500)
  }
}
