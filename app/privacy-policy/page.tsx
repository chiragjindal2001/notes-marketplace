"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Database, Eye, Lock, Clock, Mail, Globe, Users, AlertTriangle, CheckCircle } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Introduction */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  1. Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Civil Studies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="text-blue-800 font-medium">
                    <strong>Consent:</strong> By using our service, you consent to the data practices described in this policy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Database className="w-6 h-6 mr-3 text-green-600" />
                  2. Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">2.1 Personal Information</h3>
                    <p className="text-gray-700 mb-3">We may collect the following personal information:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <User className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Account Details</h4>
                          <p className="text-blue-700 text-sm">Name and email address (for account creation)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <User className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Contact Info</h4>
                          <p className="text-blue-700 text-sm">Phone number (optional, for account verification)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <Shield className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Payment Data</h4>
                          <p className="text-blue-700 text-sm">Payment information (processed securely through Razorpay)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <User className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-semibold text-blue-800">Profile Info</h4>
                          <p className="text-blue-700 text-sm">Profile information (preferences, study interests)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">2.2 Usage Information</h3>
                    <p className="text-gray-700 mb-3">We automatically collect certain information when you use our service:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on each page</li>
                      <li>Error logs and performance data</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">2.3 Cookies and Tracking</h3>
                    <p className="text-gray-700 mb-3">We use cookies and similar technologies to:</p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Remember your login status and preferences</li>
                      <li>Analyze website traffic and usage patterns</li>
                      <li>Improve our service and user experience</li>
                      <li>Provide personalized content and recommendations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Eye className="w-6 h-6 mr-3 text-purple-600" />
                  3. How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">We use the collected information for the following purposes:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Order Processing</h4>
                      <p className="text-purple-700 text-sm">Process and fulfill your orders</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Customer Support</h4>
                      <p className="text-blue-700 text-sm">Provide customer support and respond to inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800">Service Improvement</h4>
                      <p className="text-green-700 text-sm">Improve our website and services</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                    <Shield className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-orange-800">Security</h4>
                      <p className="text-orange-700 text-sm">Prevent fraud and ensure security</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing and Disclosure */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Users className="w-6 h-6 mr-3 text-red-600" />
                  4. Information Sharing and Disclosure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">4.1 Service Providers</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Payment processors (Razorpay) for transaction processing</li>
                      <li>Cloud hosting providers for data storage</li>
                      <li>Email service providers for communications</li>
                      <li>Analytics services for website improvement</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-red-400 pl-4">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">4.2 Legal Requirements</h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Comply with applicable laws and regulations</li>
                      <li>Respond to legal requests and court orders</li>
                      <li>Protect our rights and property</li>
                      <li>Prevent fraud and security threats</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-400 pl-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">4.3 Business Transfers</h3>
                    <p className="text-gray-700">
                      In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Lock className="w-6 h-6 mr-3 text-green-600" />
                  5. Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">We implement appropriate security measures to protect your information:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <Lock className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800">Encryption</h4>
                      <p className="text-green-700 text-sm">Encryption of sensitive data in transit and at rest</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Secure Payments</h4>
                      <p className="text-blue-700 text-sm">Secure payment processing through Razorpay</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Regular Audits</h4>
                      <p className="text-purple-700 text-sm">Regular security audits and updates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                    <Lock className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-orange-800">Access Controls</h4>
                      <p className="text-orange-700 text-sm">Access controls and authentication measures</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Clock className="w-6 h-6 mr-3 text-blue-600" />
                  6. Data Retention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">We retain your information for as long as necessary to:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide our services and maintain your account</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our services and user experience</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <p className="text-blue-800 font-medium">
                    <strong>Retention Periods:</strong> Account data is retained for 3 years after account deletion. Payment records are retained for 7 years as required by law.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights and Choices */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <User className="w-6 h-6 mr-3 text-purple-600" />
                  7. Your Rights and Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">You have the following rights regarding your personal information:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                    <Eye className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-purple-800">Access & Review</h4>
                      <p className="text-purple-700 text-sm">Access and review your personal information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Update & Correct</h4>
                      <p className="text-blue-700 text-sm">Update or correct inaccurate information</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-red-800">Delete Account</h4>
                      <p className="text-red-700 text-sm">Request deletion of your account and data</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800">Opt-out</h4>
                      <p className="text-green-700 text-sm">Opt-out of marketing communications</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Globe className="w-6 h-6 mr-3 text-orange-600" />
                  8. Third-Party Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">Our service may contain links to third-party websites or integrate with third-party services:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Razorpay for payment processing</li>
                  <li>Social media platforms for sharing</li>
                  <li>Analytics and tracking services</li>
                  <li>External content providers</li>
                </ul>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <p className="text-orange-800 font-medium">
                    <strong>Note:</strong> We are not responsible for the privacy practices of these third-party services. Please review their privacy policies.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Users className="w-6 h-6 mr-3 text-red-600" />
                  9. Children's Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            {/* International Data Transfers */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Globe className="w-6 h-6 mr-3 text-blue-600" />
                  10. International Data Transfers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable laws.
                </p>
              </CardContent>
            </Card>

            {/* Changes to This Policy */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Clock className="w-6 h-6 mr-3 text-orange-600" />
                  11. Changes to This Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending email notifications to registered users</li>
                  <li>Displaying prominent notices on our website</li>
                </ul>
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                  <p className="text-orange-800 font-medium">
                    <strong>Continued Use:</strong> Your continued use of our service after changes become effective constitutes acceptance of the updated policy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-lg bg-blue-50 border-l-4 border-blue-400">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-blue-800">
                  <Mail className="w-6 h-6 mr-3 text-blue-600" />
                  12. Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-800 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-blue-800">
                  <li>Support: <strong>thecivilstudies@gmail.com</strong></li>
                  <li>Response time: Within 48 hours</li>
                </ul>
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