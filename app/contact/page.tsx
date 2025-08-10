"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, MessageCircle, Users } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get in touch with us for any questions about our UPSC study materials
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            {/* Contact Information */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  We're here to help you with any questions about our UPSC handwritten notes, 
                  study materials, or any other inquiries. Feel free to reach out to us through 
                  any of the following channels.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Contact */}
                  <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Phone</h3>
                      <p className="text-blue-700 font-medium text-lg">+91 7027049101</p>
                      <p className="text-blue-600 text-sm mt-1">Call us for immediate assistance</p>
                    </div>
                  </div>

                  {/* Email Contact */}
                  <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Email</h3>
                      <p className="text-green-700 font-medium text-lg">thecivilstudies@gmail.com</p>
                      <p className="text-green-600 text-sm mt-1">Send us an email anytime</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phone Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-blue-600 font-medium text-lg mb-2">+91 7027049101</p>
                  <p className="text-gray-600 text-sm">Available for immediate support</p>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-green-600 font-medium text-lg mb-2">thecivilstudies@gmail.com</p>
                  <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
                </CardContent>
              </Card>

              {/* Location Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-purple-600 font-medium text-lg mb-2">Zirakpur, Punjab</p>
                  <p className="text-gray-600 text-sm">Serving students nationwide</p>
                </CardContent>
              </Card>
            </div>

            {/* Response Time */}
            <Card className="border-0 shadow-lg bg-yellow-50 border-l-4 border-yellow-400">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-yellow-800">
                  <Clock className="w-6 h-6 mr-3 text-yellow-600" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Phone Calls</h4>
                      <p className="text-blue-700 text-sm">Immediate response during business hours</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">Email</h4>
                      <p className="text-green-700 text-sm">Response within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What We Can Help With */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
                  <Users className="w-6 h-6 mr-3 text-purple-600" />
                  How Can We Help You?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Study Material Queries</h4>
                      <p className="text-gray-600 text-sm">Questions about our handwritten notes and study materials</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Payment & Orders</h4>
                      <p className="text-gray-600 text-sm">Help with payment processing and order status</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Technical Support</h4>
                      <p className="text-gray-600 text-sm">Download issues or technical problems</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-800">General Inquiries</h4>
                      <p className="text-gray-600 text-sm">Any other questions about our services</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <div className="text-center p-8 bg-blue-600 rounded-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-6">
                Don't hesitate to reach out to us. We're here to help you succeed in your UPSC preparation journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+917027049101" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
                <a 
                  href="mailto:thecivilstudies@gmail.com" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
