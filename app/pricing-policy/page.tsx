"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IndianRupee, CreditCard, Smartphone, Shield, Download, Mail } from "lucide-react"

export default function PricingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Pricing & Payment Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transparent pricing and secure payment options for all our UPSC study materials
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Pricing Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <IndianRupee className="w-6 h-6 mr-3 text-green-600" />
                  Pricing Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  All prices for products listed on our website (civilstudies.vercel.app) are displayed in 
                  <strong className="text-gray-900"> Indian Rupees (INR)</strong> and are inclusive of applicable taxes, 
                  unless stated otherwise. The price applicable at the time of order confirmation will be considered final.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="text-blue-800 font-medium">
                    <strong>Note:</strong> We reserve the right to change product prices at any time without prior notice.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Payments can be made through secure online methods, including:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span className="font-medium">UPI</span>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Debit/Credit Cards</span>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Net Banking</span>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Smartphone className="w-5 h-5 text-orange-600" />
                    <span className="font-medium">Supported Wallets</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Digital Delivery */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Download className="w-6 h-6 mr-3 text-green-600" />
                  Digital Delivery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Since our products are <strong className="text-gray-900">digital handwritten notes</strong>, 
                  they will be delivered via email or made available for download immediately after successful payment.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800">Email Delivery</h4>
                      <p className="text-green-700 text-sm">Notes sent directly to your registered email address</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <Download className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Instant Download</h4>
                      <p className="text-blue-700 text-sm">Access your notes immediately after payment confirmation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Policy Reference */}
            <Card className="border-0 shadow-lg bg-yellow-50 border-l-4 border-yellow-400">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-yellow-800">
                  Refund Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-800 leading-relaxed">
                  Please refer to our <strong>Refund Policy</strong> for details regarding cancellations or refunds. 
                  You can find the complete refund policy in our footer links.
                </p>
              </CardContent>
            </Card>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Transparent Pricing</h3>
                <p className="text-gray-600 text-sm">All prices in INR with taxes included</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
                <p className="text-gray-600 text-sm">Multiple secure payment options available</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Access</h3>
                <p className="text-gray-600 text-sm">Download immediately after payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 