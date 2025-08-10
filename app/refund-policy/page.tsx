"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, FileText, AlertTriangle, Clock, Mail, CheckCircle, XCircle, Shield, CreditCard, Smartphone } from "lucide-react"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cancellation and Refund Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transparent refund procedures for our digital educational products
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <FileText className="w-6 h-6 mr-3 text-blue-600" />
                  1. Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  At Civil Studies, we strive to provide high-quality educational content. This policy outlines our cancellation and refund procedures for digital products purchased through our platform.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  All transactions are processed securely through Razorpay, and refunds will be processed according to the guidelines outlined below.
                </p>
              </CardContent>
            </Card>

            {/* Digital Product Nature */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <FileText className="w-6 h-6 mr-3 text-green-600" />
                  2. Digital Product Nature
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Please note that our notes are digital products (PDF files) that are delivered immediately upon successful payment. Due to the nature of digital products:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-orange-800">No Physical Return</h4>
                      <p className="text-orange-700 text-sm">Once downloaded, the product cannot be "returned" in the traditional sense</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Digital Format</h4>
                      <p className="text-blue-700 text-sm">Digital products are non-tangible and cannot be physically returned</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800">Instant Access</h4>
                      <p className="text-green-700 text-sm">Access to purchased content is granted immediately after payment confirmation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Eligibility */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                  3. Refund Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed">We may consider refunds in the following circumstances:</p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-green-400 pl-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">3.1 Technical Issues</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>File corruption or inability to download the purchased notes</li>
                      <li>Incomplete or missing content in the PDF file</li>
                      <li>Technical errors on our platform preventing access</li>
                      <li>Duplicate charges due to system errors</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">3.2 Content Issues</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Significant discrepancy between advertised and actual content</li>
                      <li>Poor quality or illegible content</li>
                      <li>Content that violates our quality standards</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-red-400 pl-4">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">3.3 Non-Eligible Cases</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Change of mind after successful download</li>
                      <li>Dissatisfaction with content quality (subjective assessment)</li>
                      <li>Inability to use the content due to personal technical limitations</li>
                      <li>Sharing account credentials leading to unauthorized access</li>
                      <li>Refund requests made after 7 days of purchase</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Refund Process */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <RotateCcw className="w-6 h-6 mr-3 text-blue-600" />
                  4. Refund Process
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">To request a refund:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Contact Support</h4>
                      <p className="text-blue-700 text-sm">Email us at thecivilstudies@gmail.com within 7 days of purchase</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800">Provide Details</h4>
                      <p className="text-green-700 text-sm">Include order ID and detailed reason for the refund request</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Include Evidence</h4>
                      <p className="text-purple-700 text-sm">Add relevant screenshots or evidence supporting your claim</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-orange-800">Review Timeline</h4>
                      <p className="text-orange-700 text-sm">Our team will review your request within 2-3 business days</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                  <p className="text-green-800 font-medium">
                    <strong>Processing:</strong> If approved, refunds will be processed within 5-7 business days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Refund Methods */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                  5. Refund Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Approved refunds will be processed through the original payment method:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <div>
                      <span className="font-medium">Credit/Debit Cards</span>
                      <p className="text-gray-600 text-sm">Refunded to the original card (5-7 business days)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <div>
                      <span className="font-medium">UPI</span>
                      <p className="text-gray-600 text-sm">Refunded to the original UPI ID (1-3 business days)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <div>
                      <span className="font-medium">Net Banking</span>
                      <p className="text-gray-600 text-sm">Refunded to the original bank account (3-5 business days)</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Smartphone className="w-5 h-5 text-orange-600" />
                    <div>
                      <span className="font-medium">Digital Wallets</span>
                      <p className="text-gray-600 text-sm">Refunded to the original wallet (1-2 business days)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <XCircle className="w-6 h-6 mr-3 text-red-600" />
                  6. Cancellation Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Order cancellations are only possible under specific circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Before the payment is processed and confirmed</li>
                  <li>In case of technical errors preventing successful payment</li>
                  <li>When requested within 1 hour of payment (if download hasn't occurred)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Processing Time */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  7. Processing Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Our refund processing timeline:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">2-3</div>
                    <div className="text-blue-800 font-medium">Business Days</div>
                    <div className="text-blue-600 text-sm">Refund request review</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">5-7</div>
                    <div className="text-green-800 font-medium">Business Days</div>
                    <div className="text-green-600 text-sm">Refund processing</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-2">3-5</div>
                    <div className="text-orange-800 font-medium">Business Days</div>
                    <div className="text-orange-600 text-sm">Bank processing time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-lg bg-blue-50 border-l-4 border-blue-400">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-blue-800">
                  <Mail className="w-6 h-6 mr-3 text-blue-600" />
                  8. Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-800 leading-relaxed">
                  For refund requests or questions about this policy:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-blue-800">
                  <li>Email: <strong>thecivilstudies@gmail.com</strong></li>
                  <li>Response time: Within 24 hours on business days</li>
                  <li>Please include your order ID in all communications</li>
                </ul>
              </CardContent>
            </Card>

            {/* Dispute Resolution */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Shield className="w-6 h-6 mr-3 text-purple-600" />
                  9. Dispute Resolution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  If you disagree with our refund decision:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>You may request a review by our senior support team</li>
                  <li>Provide additional evidence or clarification</li>
                  <li>We will conduct a thorough review within 5 business days</li>
                  <li>Final decisions are binding</li>
                </ul>
              </CardContent>
            </Card>

            {/* Policy Updates */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Clock className="w-6 h-6 mr-3 text-orange-600" />
                  10. Policy Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting on our website. Continued use of our service constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>

            {/* Last Updated */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 