"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Star, Users, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { notesApi } from "@/lib/api"

// Mock data - replace with actual data from your database
// const featuredNotes = [
//   {
//     id: 1,
//     title: "Advanced Calculus Notes",
//     subject: "Mathematics",
//     price: 15.99,
//     rating: 4.9,
//     downloads: 234,
//     preview: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 2,
//     title: "Organic Chemistry Complete",
//     subject: "Chemistry",
//     price: 19.99,
//     rating: 4.8,
//     downloads: 189,
//     preview: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: 3,
//     title: "Physics Mechanics & Waves",
//     subject: "Physics",
//     price: 12.99,
//     rating: 4.7,
//     downloads: 156,
//     preview: "/placeholder.svg?height=200&width=300",
//   },
// ]

// const subjects = [
//   { name: "Mathematics", count: 45, icon: "📐" },
//   { name: "Physics", count: 32, icon: "⚛️" },
//   { name: "Chemistry", count: 28, icon: "🧪" },
//   { name: "Biology", count: 24, icon: "🧬" },
//   { name: "Computer Science", count: 19, icon: "💻" },
//   { name: "Engineering", count: 15, icon: "⚙️" },
// ]

export default function HomePage() {
  const [featuredNotes, setFeaturedNotes] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured notes
        const notesResponse = await notesApi.getAll({
          limit: 3,
          sort: "popular",
        })
        if (notesResponse.success && notesResponse.data) {
          setFeaturedNotes(Array.isArray(notesResponse.data.items) ? notesResponse.data.items : notesResponse.data)
        }

        // Fetch subjects
        const subjectsResponse = await notesApi.getSubjects()
        if (subjectsResponse.success && subjectsResponse.data) {
          setSubjects(subjectsResponse.data.subjects)
        }
      } catch (error) {
        console.error("Failed to fetch home page data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              ✨ Premium Quality Notes
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Master Your Studies
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access premium handwritten notes crafted by top students. Clear explanations, detailed diagrams, and
              comprehensive coverage of key topics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/browse">
                Browse Notes <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Notes Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">10k+</div>
              <div className="text-gray-600">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About the Creator</h2>
              <p className="text-gray-600 mb-4">
                Hi! I'm a passionate educator and top-performing student who believes in the power of well-organized,
                handwritten notes. Having achieved excellent grades across multiple subjects, I've decided to share my
                comprehensive notes to help fellow students succeed.
              </p>
              <p className="text-gray-600 mb-6">
                Each set of notes is carefully crafted with clear explanations, helpful diagrams, and important formulas
                highlighted for easy reference during exams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Top 1% Student
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  10k+ Students Helped
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  4.9/5 Rating
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Study setup with handwritten notes"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Notes */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Notes</h2>
            <p className="text-gray-600">Our most popular and highly-rated study materials</p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading featured notes...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {Array.isArray(featuredNotes) && featuredNotes.map((note) => (
                <Card key={note.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    {(() => {
                      const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, '') || "http://localhost:8080";
                      let imageUrl = note.preview_image || "/placeholder.svg";
                      if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = `${BACKEND_BASE_URL}${imageUrl}`;
                      }
                      console.log('Featured Note Image URL:', imageUrl);
                      return (
                        <Image
                          src={imageUrl}
                          alt={note.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      );
                    })()}
                  </CardHeader>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-2">
                      {note.subject}
                    </Badge>
                    <CardTitle className="mb-2">{note.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {note.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {note.downloads}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">₹{note.price}</span>
                      <Button asChild>
                        <Link href={`/notes/${note.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/browse">View All Notes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Subject</h2>
            <p className="text-gray-600">Find notes for your specific area of study</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject) => (
              <Link key={subject.name} href={`/browse?subject=${subject.name.toLowerCase()}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer text-center p-6">
                  <div className="text-3xl mb-2">{subject.icon}</div>
                  <h3 className="font-semibold mb-1">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.count} notes</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel in Your Studies?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have improved their grades with our premium notes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/browse">Start Browsing</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
