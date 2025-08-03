"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Download, ShoppingCart, FileText, Award } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { notesApi } from "@/lib/api"
import Link from "next/link"
import { LoadingSpinner, LoadingPage } from "@/components/ui/loading-spinner"

export default function NoteDetailPage() {
  const [aspect, setAspect] = useState<'portrait' | 'landscape' | null>(null);
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()
  const { toast } = useToast()

  const [note, setNote] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('params.id:', params?.id); // DEBUG: Log the note ID
    
    // Ensure we have a valid ID before making the API call
    if (!params?.id) {
      setError('Note ID is missing');
      setLoading(false);
      return;
    }

    const fetchNote = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Convert ID to number safely
        const noteId = Number(params.id);
        if (isNaN(noteId)) {
          throw new Error('Invalid note ID');
        }
        
        const response = await notesApi.getById(noteId);
        console.log('API response:', response); // DEBUG: Log the API response
        
        if (response.success && response.data) {
          const noteData = response.data;
          
          // Safely parse JSON fields
          const safeParse = (jsonString: string) => {
            try {
              return jsonString ? JSON.parse(jsonString) : [];
            } catch (e) {
              console.error('Error parsing JSON:', e);
              return [];
            }
          };
          
          setNote({
            ...noteData,
            features: safeParse(noteData.features),
            sample_pages: safeParse(noteData.sample_pages),
            topics: safeParse(noteData.topics),
            tags: safeParse(noteData.tags),
          });
          setReviews(response.data.reviews || []);
        }
      } catch (error) {
        console.error("Failed to fetch note:", error)
        setError("Failed to load note details.")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchNote()
    }
  }, [params.id])

  const handleAddToCart = async () => {
    if (!note) return
    await addItem({
      id: note.id.toString(),
      title: note.title,
      price: note.price,
      image: note.preview_image,
    })

    toast({
      title: "Added to cart!",
      description: `${note.title} has been added to your cart.`,
    })
  }

  const handleBuyNow = async () => {
    if (!note) return
    await addItem({
      id: note.id.toString(),
      title: note.title,
      price: note.price,
      image: note.preview_image,
    })
    // Redirect to checkout
    window.location.href = "/checkout"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <LoadingSpinner size="lg" text="Loading note details..." />
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-red-500 text-lg">{error || "Note not found"}</p>
          <Button asChild variant="outline" className="mt-4 bg-transparent">
            <Link href="/browse">Back to Browse</Link>
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <div className="mb-4">
              {(() => {
                const BACKEND_BASE_URL = "https://sienna-cod-887616.hostingersite.com"; // <-- Set your backend URL here
                const rawImageUrl =
                  (note.sample_pages && note.sample_pages.length > 0 && note.sample_pages[selectedImage]) ||
                  note.preview_image ||
                  "/placeholder.svg";
                const imageUrl = rawImageUrl.startsWith("http") ? rawImageUrl : `${BACKEND_BASE_URL}${rawImageUrl}`;
                // Handler to detect image aspect
                const handleImageLoad = (img: HTMLImageElement) => {
                  if (img.naturalHeight > img.naturalWidth) {
                    setAspect('portrait');
                  } else {
                    setAspect('landscape');
                  }
                };
                // Choose container class
                let containerClass = 'mx-auto relative rounded-lg shadow-lg flex items-center justify-center';
                if (aspect === 'portrait') {
                  containerClass += ' aspect-[9/11.2] max-w-xs sm:max-w-sm md:max-w-md'; // reduced height
                } else if (aspect === 'landscape') {
                  containerClass += ' aspect-[16/6.3] max-w-2xl sm:max-w-3xl'; // reduced height
                } else {
                  containerClass += ' aspect-[16/6.3] max-w-2xl'; // reduced height
                }
                return (
                  <div className={containerClass}>
                    <Image
                      src={imageUrl}
                      alt={`${note.title} preview`}
                      fill
                      style={{ objectFit: 'cover' }}
                      onLoadingComplete={handleImageLoad}
                      className="rounded-lg"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                );
              })()}
            </div>

            <div className="grid grid-cols-3 gap-4">
              {note.sample_pages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-lg overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            <div className="mb-6">
              <Badge variant="outline" className="mb-2">
                {note.subject}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{note.title}</h1>

              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(note.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{note.rating}</span>
                  <span className="text-gray-600">({note.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Download className="h-4 w-4" />
                  <span>{note.downloads} downloads</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{note.description}</p>

              <div className="text-4xl font-bold text-blue-600 mb-6">
                <span className="font-semibold text-lg text-blue-600">₹{note.price}</span>
              </div>

              <div className="flex gap-4 mb-8">
                <Button onClick={handleBuyNow} size="lg" className="flex-1">
                  Buy Now
                </Button>
                <Button onClick={handleAddToCart} variant="outline" size="lg" className="flex-1 bg-transparent">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Author Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  About the Author
                </h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Name:</strong> {note.author?.name ?? "N/A"}
                  </p>
                  <p>
                    <strong>Credentials:</strong> {note.author?.credentials ?? "N/A"}
                  </p>
                  <p>
                    <strong>Experience:</strong> {note.author?.experience ?? "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="topics">Topics Covered</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    What's Included
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {note.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Topics Covered</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {note.topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {reviews.map((review: any) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-semibold">{review.user.name}</span>
                          <span className="text-gray-500 text-sm">{review.created_at}</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
