"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrderConfirmation } from "@/components/order-confirmation"
import { userOrdersApi } from "@/lib/api"
import { LoadingSpinner, LoadingPage } from "@/components/ui/loading-spinner"

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        setError("No order ID provided")
        setLoading(false)
        return
      }

      try {
        const response = await userOrdersApi.getOrderById(orderId)
        if (response.success && response.data) {
          setOrderData(response.data)
        } else {
          setError(response.message || "Failed to fetch order details")
        }
      } catch (error: any) {
        console.error("Error fetching order data:", error)
        setError(error.message || "Failed to fetch order details")
      } finally {
        setLoading(false)
      }
    }

    fetchOrderData()
  }, [orderId])

  if (loading) {
    return <LoadingPage text="Loading order details..." />
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "Unable to load order details"}</p>
          <a href="/browse" className="text-blue-600 hover:underline">
            Browse Notes
          </a>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <OrderConfirmation orderData={orderData} />
      </div>

      <Footer />
    </div>
  )
}

function SuccessPageFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <LoadingPage text="Loading..." />
      </div>
      <Footer />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessPageFallback />}>
      <SuccessPageContent />
    </Suspense>
  )
}
