"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, Mail, Shield } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"

import { PaymentMethods } from "@/components/payment-methods"
import type { RazorpayResponse } from "@/lib/razorpay-client"
import { checkoutApi } from "@/lib/api"
import { loadRazorpayScript, initiateRazorpayPayment } from "@/lib/razorpay-client";
import { LoadingSpinner, LoadingPage } from "@/components/ui/loading-spinner"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ""
  })



  useEffect(() => {
    loadRazorpayScript();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('user_token')
    if (!token) {
      router.push('/login?callbackUrl=/checkout')
      return
    }
    setIsAuthenticated(true)
    setIsLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Remove GST calculation
  const calculateTotals = () => {
    const subtotal = getTotal()
    const total = subtotal
    return { subtotal, total }
  }

  const { subtotal, total } = calculateTotals()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // First create the order
      const response = await checkoutApi.createOrder({
        items: items.map((item) => ({
          note_id: item.note_id
        })),
        customer_info: {
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        }
      })

      if (response.success && response.data) {
        const orderData = response.data as any;
        // Immediately initiate payment with the created order
        await initiateRazorpayPayment({
          key: orderData.key,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Civil Studies",
          description: "Purchase civil services notes",
          order_id: orderData.razorpay_order_id,
          handler: async (paymentResponse: RazorpayResponse) => {
            // Handle payment success with the order_id from the backend
            await handlePaymentSuccess(paymentResponse, orderData.order_id)
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            ...(formData.phone && { contact: formData.phone }),
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
      } else {
        throw new Error(response.message || "Failed to create order")
      }
    } catch (error: any) {
      console.error("Payment error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = async (response: RazorpayResponse, orderId: string) => {
    setIsVerifyingPayment(true)
    try {
      // Extract order_id from the response or use a different approach
      // For now, we'll need to get the order_id from the backend response
      const verifyResponse = await checkoutApi.verifyPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        order_id: orderId,
      })

      if (verifyResponse.success) {
        // Clear cart first, then navigate to success page
        await clearCart()
        toast({
          title: "Payment Successful!",
          description: "Your notes have been sent to your email address.",
        })
        // Navigate to success page
        window.location.href = `/success?orderId=${orderId}`
      } else {
        throw new Error(verifyResponse.message || "Payment verification failed")
      }
    } catch (error: any) {
      console.error("Payment verification error:", error)
      toast({
        title: "Payment Verification Failed",
        description: error.message || "Please contact support if amount was deducted.",
        variant: "destructive",
      })
    } finally {
      setIsVerifyingPayment(false)
    }
  }

  const handlePaymentError = (error: any) => {
    console.error("Payment error:", error)
    toast({
      title: "Payment Failed",
      description: "Payment could not be processed. Please try again.",
      variant: "destructive",
    })
  }

  if (isLoading) {
    return <LoadingPage text="Loading checkout..." />
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">No items to checkout</h1>
          <Button asChild>
            <a href="/browse">Browse Notes</a>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <form onSubmit={handlePayment} className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                    <p className="text-sm text-gray-600 mt-1">Your notes will be delivered to this email address</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Information */}
              {/* (Removed the entire Billing Information Card section) */}

              <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Pay ₹{total.toFixed(2)}
                  </>
                )}
              </Button>
            </form>

            {/* Payment Methods */}
            <PaymentMethods />
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={60}
                      height={40}
                      className="w-15 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-semibold">₹{item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {/* Remove GST row */}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Digital Delivery
                  </h4>
                  <p className="text-sm text-blue-800">
                    Your notes will be delivered instantly to your email address after payment confirmation.
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Secure Payment</h4>
                  <p className="text-sm text-green-800">
                    Powered by Razorpay. Supports UPI, Cards, Net Banking, and Wallets.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Verification Loading Overlay */}
      {isVerifyingPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <LoadingSpinner className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verifying Payment</h3>
            <p className="text-gray-600 mb-4">
              Please wait while we verify your payment with our payment gateway...
            </p>
            <div className="text-sm text-gray-500">
              This usually takes a few seconds. Please do not close this window.
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
