"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { adminApi } from "@/lib/api"

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Engineering",
  "Economics",
  "Psychology",
]

export function UploadNoteForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "Mathematics",
    price: "",
    tags: "",
  })
  const [files, setFiles] = useState<{
    noteFile: File | null
    previewImage: File | null
  }>({
    noteFile: null,
    previewImage: null,
  })
  const [isUploading, setIsUploading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "noteFile" | "previewImage") => {
    const file = e.target.files?.[0] || null
    setFiles({
      ...files,
      [fileType]: file,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("subject", formData.subject)
      formDataToSend.append("price", formData.price)
      formDataToSend.append("tags", formData.tags)

      if (files.noteFile) {
        formDataToSend.append("note_file", files.noteFile)
      }
      if (files.previewImage) {
        formDataToSend.append("preview_image", files.previewImage)
      }

      const response = await adminApi.createNote(formDataToSend)

      if (response.success) {
        toast({
          title: "Note uploaded successfully!",
          description: `${formData.title} has been added to your collection.`,
        })

        // Reset form
        setFormData({
          title: "",
          description: "",
          subject: "",
          price: "",
          tags: "",
        })
        setFiles({
          noteFile: null,
          previewImage: null,
        })
      } else {
        throw new Error(response.message || "Failed to upload note")
      }
    } catch (error: any) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload New Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Note Title</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Advanced Calculus Notes"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
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

              <div>
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="100"
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="calculus, derivatives, integrals"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what's covered in these notes..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="noteFile">Note File (PDF)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Input
                    id="noteFile"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "noteFile")}
                    className="hidden"
                  />
                  <Label htmlFor="noteFile" className="cursor-pointer">
                    {files.noteFile ? (
                      <span className="text-green-600">{files.noteFile.name}</span>
                    ) : (
                      <span className="text-gray-600">Click to upload PDF</span>
                    )}
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="previewImage">Preview Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Input
                    id="previewImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "previewImage")}
                    className="hidden"
                  />
                  <Label htmlFor="previewImage" className="cursor-pointer">
                    {files.previewImage ? (
                      <span className="text-green-600">{files.previewImage.name}</span>
                    ) : (
                      <span className="text-gray-600">Click to upload image</span>
                    )}
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isUploading}>
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Notes
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
