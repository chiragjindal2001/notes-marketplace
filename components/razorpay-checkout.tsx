"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { initiateRazorpayPayment, type RazorpayResponse } from "@/lib/razorpay-client"

interface RazorpayCheckoutProps {
  orderData: {
    razorpay_order_id: string
    order_id: string
    amount: number
    currency: string
    key: string
    customer: {
      name: string
      email: string
    }
  }
  onSuccess: (response: RazorpayResponse) => void
  onError: (error: any) => void
}

export function RazorpayCheckout({ orderData, onSuccess, onError }: RazorpayCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      await initiateRazorpayPayment({
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "StudyNotes",
        description: "Purchase handwritten notes",
        order_id: orderData.razorpay_order_id,
        handler: (response: RazorpayResponse) => {
          setIsProcessing(false)
          onSuccess(response)
        },
        prefill: {
          name: orderData.customer.name,
          email: orderData.customer.email,
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
            toast({
              title: "Payment Cancelled",
              description: "You cancelled the payment process.",
              variant: "destructive",
            })
          },
        },
      })
    } catch (error) {
      setIsProcessing(false)
      onError(error)
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button onClick={handlePayment} disabled={isProcessing} size="lg" className="w-full">
      {isProcessing ? "Processing..." : `Pay ₹${(orderData.amount / 100).toFixed(2)}`}
    </Button>
  )
}
