"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, User, CreditCard, AlertTriangle, Clock, Mail } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms and Conditions
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Acceptance of Terms */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <FileText className="w-6 h-6 mr-3 text-blue-600" />
                  1. Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using Civil Studies ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                  <p className="text-red-800 font-medium">
                    <strong>Important:</strong> If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Description of Service */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Shield className="w-6 h-6 mr-3 text-green-600" />
                  2. Description of Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Civil Studies is an online platform that provides educational notes, study materials, and academic resources for students and educators.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The Service allows users to browse, purchase, and download educational content in PDF format.
                </p>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <User className="w-6 h-6 mr-3 text-purple-600" />
                  3. User Accounts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  To access certain features of the Service, you must create an account. You are responsible for:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Account Security</h4>
                      <p className="text-gray-600 text-sm">Maintaining the confidentiality of your account credentials</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Account Activity</h4>
                      <p className="text-gray-600 text-sm">All activities that occur under your account</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Accurate Information</h4>
                      <p className="text-gray-600 text-sm">Providing accurate and complete information during registration</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Unauthorized Use</h4>
                      <p className="text-gray-600 text-sm">Notifying us immediately of any unauthorized use of your account</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                  4. Payment Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  All purchases are processed securely through Razorpay. By making a purchase, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Pay the specified price for the selected notes</li>
                  <li>Provide accurate payment information</li>
                  <li>Authorize the transaction through your chosen payment method</li>
                  <li>Accept our refund policy as outlined in our Cancellation and Refund Policy</li>
                </ul>
              </CardContent>
            </Card>

            {/* Intellectual Property Rights */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  5. Intellectual Property Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  All content available on Civil Studies, including but not limited to notes, text, graphics, and software, is the property of Civil Studies or its content providers and is protected by copyright laws.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="text-blue-800 font-medium">
                    <strong>License:</strong> By purchasing notes, you are granted a limited, non-exclusive, non-transferable license to use the content for personal, non-commercial purposes only.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  You may not reproduce, distribute, modify, or create derivative works from the purchased content without explicit permission.
                </p>
              </CardContent>
            </Card>

            {/* Prohibited Uses */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                  6. Prohibited Uses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">You agree not to use the Service to:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-800">Legal Violations</h4>
                      <p className="text-red-700 text-sm">Violate any applicable laws or regulations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-800">Rights Infringement</h4>
                      <p className="text-red-700 text-sm">Infringe upon the rights of others</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-800">Malicious Software</h4>
                      <p className="text-red-700 text-sm">Upload or distribute malicious software</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-800">Unauthorized Access</h4>
                      <p className="text-red-700 text-sm">Attempt to gain unauthorized access to our systems</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Policy */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Shield className="w-6 h-6 mr-3 text-green-600" />
                  7. Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
                </p>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
                  8. Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The Service is provided "as is" without warranties of any kind. Civil Studies does not guarantee:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>The accuracy or completeness of any content</li>
                  <li>That the Service will be uninterrupted or error-free</li>
                  <li>That defects will be corrected</li>
                  <li>The results of using the Service</li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                  9. Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall Civil Studies be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  10. Changes to Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service constitutes acceptance of the modified terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-lg bg-blue-50 border-l-4 border-blue-400">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-blue-800">
                  <Mail className="w-6 h-6 mr-3 text-blue-600" />
                  11. Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 leading-relaxed">
                  If you have any questions about these Terms and Conditions, please contact us at <strong>thecivilstudies@gmail.com</strong>
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