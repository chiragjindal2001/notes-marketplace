"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Download, Search, Grid, List } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { notesApi } from "@/lib/api"
import { LoadingSpinner, LoadingPage } from "@/components/ui/loading-spinner"

const BACKEND_URL = process.env.SERVER_BASE_URL || (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace(/\/api$/, '') : 'https://sienna-cod-887616.hostingersite.com/');

export default function BrowsePage() {
  const router = useRouter()
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredNotes, setFilteredNotes] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  // Remove viewMode state and toggle
  // const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { addItem } = useCart()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const subjects = ["All", "History", "Geography", "Polity", "Economics", "Environment", "Science & Technology", "Current Affairs", "General Studies"]
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
  ]

  useEffect(() => {
    const token = localStorage.getItem('user_token')
    if (!token) {
      router.push('/login?callbackUrl=/browse')
      return
    }
    setIsAuthenticated(true)
  }, [router])

  // Fetch all notes once on component mount
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchNotes = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await notesApi.getAll({
          page: 1,
          limit: 100, // Get more notes for client-side filtering
        })

        if (response.success && response.data) {
          let items;
          if (Array.isArray(response.data)) {
            items = response.data;
          } else if (response.data && Array.isArray(response.data.items)) {
            items = response.data.items;
          } else {
            items = [];
          }
          setNotes(items);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error)
        setError("Failed to load notes. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [isAuthenticated])

  // Client-side filtering and sorting
  useEffect(() => {
    if (!notes.length) return;

    let filtered = [...notes];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchLower) ||
        note.description.toLowerCase().includes(searchLower) ||
        note.subject.toLowerCase().includes(searchLower)
      );
    }

    // Apply subject filter
    if (selectedSubject !== "All") {
      filtered = filtered.filter(note => note.subject === selectedSubject);
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        // Sort by downloads (descending)
        filtered.sort((a, b) => {
          const aDownloads = typeof a.downloads === 'string' ? parseInt(a.downloads) : a.downloads;
          const bDownloads = typeof b.downloads === 'string' ? parseInt(b.downloads) : b.downloads;
          return bDownloads - aDownloads;
        });
        break;
      case "rating":
        // Sort by rating (descending)
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        // Sort by price (ascending)
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        // Sort by price (descending)
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // Sort by created_at (descending)
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        // Default: newest first
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    setFilteredNotes(filtered);
  }, [notes, searchTerm, selectedSubject, sortBy]);

  const handleAddToCart = (note: (typeof notes)[0]) => {
    if (!isAuthenticated) {
      router.push('/login?callbackUrl=/browse')
      return
    }
    addItem({
      id: note.id.toString(),
      title: note.title,
      price: note.price,
      image: note.preview_image,
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show loading page while checking authentication
  if (loading) {
    return <LoadingPage text="Loading notes..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Notes</h1>
          <p className="text-gray-600">Find the perfect civil services study materials for your subjects</p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredNotes.length} of {notes.length} notes
          </div>
        </div>

        {/* Add loading and error states in the render: */}
        {loading && (
          <div className="text-center py-12">
            <LoadingSpinner size="lg" text="Loading notes..." />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
              Try Again
            </Button>
          </div>
        )}

        {/* Notes Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.isArray(filteredNotes) && filteredNotes.map((note, idx) => (
            <Card
              key={note.id}
              className="hover:shadow-lg transition-shadow w-[240px] mx-auto"
            >
              <CardHeader className="p-0">
                <Image
                  src={
                    note.preview_image
                      ? (note.preview_image.startsWith('/uploads/')
                        ? BACKEND_URL + note.preview_image
                        : note.preview_image)
                      : "/placeholder.svg"
                  }
                  alt={note.title}
                  width={240}
                  height={160}
                  className="object-cover w-full h-[120px] rounded-t-lg"
                  priority={idx === 0}
                />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline">{note.subject}</Badge>
                  <span className="font-semibold text-lg text-blue-600">₹{note.price}</span>
                </div>

                <CardTitle className="mb-2 line-clamp-2 text-base md:text-lg truncate">{note.title}</CardTitle>
                <p className="text-gray-600 text-xs md:text-sm mb-4 line-clamp-2 truncate">{note.description}</p>

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

                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1 bg-transparent px-2 py-1 text-xs h-8">
                    <Link href={`/notes/${note.id}`}>View Details</Link>
                  </Button>
                  <Button onClick={() => handleAddToCart(note)} className="flex-1 px-2 py-1 text-xs h-8">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(Array.isArray(filteredNotes) ? filteredNotes.length : 0) === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No notes found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedSubject("All")
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
