import Razorpay from "razorpay"
import crypto from "crypto"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export default razorpay

export async function createRazorpayOrder(amount: number, currency = "INR", receipt: string, notes?: any) {
  const options = {
    amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
    currency,
    receipt,
    notes,
  }

  return await razorpay.orders.create(options)
}

export async function verifyRazorpayPayment(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
): boolean {
  const body = razorpayOrderId + "|" + razorpayPaymentId
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex")

  return expectedSignature === razorpaySignature
}

export async function fetchRazorpayPayment(paymentId: string) {
  return await razorpay.payments.fetch(paymentId)
}

export async function fetchRazorpayOrder(orderId: string) {
  return await razorpay.orders.fetch(orderId)
}

export async function createRazorpayRefund(paymentId: string, amount?: number, notes?: any) {
  const options: any = {
    payment_id: paymentId,
    notes,
  }

  if (amount) {
    options.amount = Math.round(amount * 100) // Convert to paise
  }

  return await razorpay.payments.refund(paymentId, options)
}
