"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail, Clock } from "lucide-react"
import Link from "next/link"

interface OrderConfirmationProps {
  orderData: {
    order_id: string
    customer_email: string
    total_amount: number
    items: Array<{
      title: string
      price: number
      quantity: number
    }>
  }
}

export function OrderConfirmation({ orderData }: OrderConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          <p className="text-gray-600">Order #{orderData.order_id}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Check Your Email</span>
            </div>
            <p className="text-green-700 text-sm">
              Your download links have been sent to <strong>{orderData.customer_email}</strong>
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Order Summary</h3>
            {orderData.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 font-bold text-lg">
              <span>Total Paid</span>
              <span>₹{orderData.total_amount.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              What happens next?
            </h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <span>Check your email for download links</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <span>Download your notes (PDF format)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span>Start studying and excel!</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href="/browse">
                <Download className="h-4 w-4 mr-2" />
                Browse More Notes
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
