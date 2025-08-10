"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, Users, Target, CheckCircle } from "lucide-react"
import Image from "next/image"

const BACKEND_URL = process.env.SERVER_BASE_URL || (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api$/, '') : 'https://sienna-cod-887616.hostingersite.com/');

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About Civil Studies
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Your trusted partner in UPSC preparation with expert handwritten notes and comprehensive study materials.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="text-blue-800 bg-white">
                  <Award className="w-4 h-4 mr-2" />
                  5+ Years Experience
                </Badge>
                <Badge variant="secondary" className="text-blue-800 bg-white">
                  <Users className="w-4 h-4 mr-2" />
                  10k+ Students
                </Badge>
                <Badge variant="secondary" className="text-blue-800 bg-white">
                  <Target className="w-4 h-4 mr-2" />
                  UPSC Focused
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/about_us.jpg"
                alt="UPSC Preparation"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About the Author Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Your Mentor
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ms. Bhavika Ma'am - A dedicated educator with years of experience in guiding UPSC aspirants towards success
              </p>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Your Guide to UPSC Success
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  With over <strong>5 years of dedicated teaching experience</strong> in UPSC preparation, 
                  I have had the privilege of guiding hundreds of aspirants on their journey to becoming 
                  civil servants. My passion for education and deep understanding of the UPSC examination 
                  pattern has helped countless students achieve their dreams.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Having worked closely with UPSC aspirants, I understand the challenges they face - 
                  from managing vast syllabi to finding reliable study materials. This understanding 
                  led me to create comprehensive, handwritten notes that are specifically designed 
                  to address the unique needs of UPSC preparation.
                </p>
                
                <p className="text-lg leading-relaxed">
                  My notes are not just summaries; they are carefully crafted study materials that 
                  combine years of teaching experience with insights from successful candidates. 
                  Each note is designed to help you understand complex topics easily and retain 
                  information effectively.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                  <div className="text-gray-600">Years Teaching</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10k+</div>
                  <div className="text-gray-600">Students Guided</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/PHOTO-2025-07-28-10-08-57.jpg?height=400&width=400"
                alt="UPSC Teacher"
                width={500}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Notes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Handwritten Notes?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expertly crafted study materials designed specifically for UPSC success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expertly Handwritten</h3>
                <p className="text-gray-600">
                  Each note is carefully handwritten by an experienced UPSC teacher, ensuring clarity 
                  and easy understanding of complex topics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">UPSC Focused</h3>
                <p className="text-gray-600">
                  Content is specifically tailored to UPSC examination requirements, covering all 
                  essential topics with the right depth and perspective.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Comprehensive Coverage</h3>
                <p className="text-gray-600">
                  Complete coverage of UPSC syllabus including History, Geography, Polity, 
                  Economics, Environment, and Current Affairs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Proven Success</h3>
                <p className="text-gray-600">
                  Based on 5+ years of teaching experience and feedback from successful UPSC 
                  candidates who have used these materials.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Student Tested</h3>
                <p className="text-gray-600">
                  Materials have been used and refined based on feedback from over 10k+ students 
                  preparing for UPSC examinations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy to Understand</h3>
                <p className="text-gray-600">
                  Complex topics are broken down into simple, digestible content that makes 
                  learning effective and retention better.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            To provide every UPSC aspirant with high-quality, comprehensive study materials that make 
            their preparation journey easier and more effective. We believe that quality education 
            should be accessible to all, and our handwritten notes are designed to bridge the gap 
            between complex UPSC topics and easy understanding.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
} 