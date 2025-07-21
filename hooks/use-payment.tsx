"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface PaymentHookReturn {
  isProcessing: boolean
  createOrder: (orderData: any) => Promise<any>
  verifyPayment: (paymentData: any) => Promise<any>
  error: string | null
}

export function usePayment(): PaymentHookReturn {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const createOrder = async (orderData: any) => {
    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message)
      }

      return result.data
    } catch (error: any) {
      const errorMessage = error.message || "Unable to create order. Please try again."
      setError(errorMessage)
      toast({
        title: "Order Creation Failed",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  const verifyPayment = async (paymentData: any) => {
    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message)
      }

      return result.data
    } catch (error: any) {
      const errorMessage = error.message || "Unable to verify payment. Please contact support."
      setError(errorMessage)
      toast({
        title: "Payment Verification Failed",
        description: errorMessage,
        variant: "destructive",
      })
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    isProcessing,
    createOrder,
    verifyPayment,
    error,
  }
}
