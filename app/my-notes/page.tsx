"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Note {
  id: string
  title: string
  subject: string
  price: number
  preview_image?: string
  download_url: string
}

export default function MyNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("All")
  const { toast } = useToast();

  // Extract unique subjects from notes
  const subjects = ["All", ...Array.from(new Set(notes.map((n) => n.subject)))]

  // Filter notes by subject and search
  const filteredNotes = notes.filter(
    (note) =>
      (selectedSubject === "All" || note.subject === selectedSubject) &&
      (searchTerm === "" || note.title.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      setError(null)
      try {
        const backendUrl = process.env.NEXT_PUBLIC_PHP_API_URL || "https://sienna-cod-887616.hostingersite.com/api/my-notes";
        const res = await fetch(backendUrl, {
          credentials: "include",
          headers: {
            // Forward the JWT if stored in localStorage
            ...(typeof window !== 'undefined' && localStorage.getItem('user_token')
              ? { Authorization: `Bearer ${localStorage.getItem('user_token')}` }
              : {})
          }
        });
        const data = await res.json()
        if (data.success && Array.isArray(data.data)) {
          setNotes(data.data)
        } else {
          setError(data.message || "Failed to fetch notes.")
        }
      } catch (e) {
        setError("Failed to fetch notes.")
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  // Group notes by subject
  const notesBySubject = notes.reduce((acc, note) => {
    if (!acc[note.subject]) acc[note.subject] = [];
    acc[note.subject].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  // Helper to handle download securely
  const handleDownload = async (note: Note) => {
    try {
      if (!note.id) {
        toast({ title: "Error", description: "Note ID missing.", variant: "destructive" });
        return;
      }
      const backendUrl = process.env.NEXT_PUBLIC_PHP_API_URL || "https://sienna-cod-887616.hostingersite.com/";
      const userToken = typeof window !== 'undefined' ? localStorage.getItem('user_token') : null;
      const res = await fetch(`${backendUrl}api/downloads/${note.id}`, {
        method: "GET",
        headers: {
          ...(userToken ? { Authorization: `Bearer ${userToken}` } : {})
        },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast({ title: "Download Failed", description: data.message || "You are not authorized to download this note.", variant: "destructive" });
        return;
      }
      const blob = await res.blob();
      // Try to get filename from Content-Disposition header
      let filename = note.title ? note.title.replace(/\s+/g, '-').toLowerCase() + '-notes.pdf' : 'note.pdf';
      const disposition = res.headers.get('Content-Disposition');
      if (disposition && disposition.indexOf('filename=') !== -1) {
        const match = disposition.match(/filename="?([^";]+)"?/);
        if (match && match[1]) filename = match[1];
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
    } catch (e) {
      toast({ title: "Download Failed", description: "An error occurred while downloading.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">My Notes</h1>
          <p className="text-gray-600">All your purchased notes, ready to download.</p>
        </div>
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4"
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
          </div>
        </div>
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading your notes...</p>
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
        {!loading && !error && filteredNotes.length === 0 && (
          <div className="text-center py-16 text-gray-500">You have not purchased any notes yet.</div>
        )}
        {!loading && !error && filteredNotes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredNotes.map((note, idx) => {
              let imageUrl = note.preview_image && note.preview_image !== '' ? note.preview_image : "/placeholder.svg";
              if (imageUrl && imageUrl !== "/placeholder.svg") {
                if (imageUrl.startsWith('http')) {
                  // use as is
                } else if (imageUrl.startsWith('/')) {
                  imageUrl = `https://sienna-cod-887616.hostingersite.com/${imageUrl}`;
                } else {
                  imageUrl = `https://sienna-cod-887616.hostingersite.com/uploads/images/${imageUrl.replace(/^\/+/, '')}`;
                }
              }
              return (
                <Card key={note.id} className="hover:shadow-lg transition-shadow w-[240px] mx-auto">
                  <CardHeader className="p-0">
                    <Image
                      src={imageUrl}
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
                    </div>
                    <CardTitle className="mb-2 line-clamp-2 text-base md:text-lg truncate">{note.title}</CardTitle>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" onClick={() => handleDownload(note)}>
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
} 