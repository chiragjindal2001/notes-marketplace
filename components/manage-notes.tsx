"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2, Search, Star, Download } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { adminApi } from "@/lib/api"

// Mock data
// const mockNotes = [
//   {
//     id: 1,
//     title: "Advanced Calculus Notes",
//     subject: "Mathematics",
//     price: 15.99,
//     rating: 4.9,
//     downloads: 234,
//     status: "active",
//     uploadDate: "2024-01-15",
//     preview: "/placeholder.svg?height=60&width=80",
//   },
//   {
//     id: 2,
//     title: "Organic Chemistry Complete",
//     subject: "Chemistry",
//     price: 19.99,
//     rating: 4.8,
//     downloads: 189,
//     status: "active",
//     uploadDate: "2024-01-12",
//     preview: "/placeholder.svg?height=60&width=80",
//   },
//   {
//     id: 3,
//     title: "Physics Mechanics & Waves",
//     subject: "Physics",
//     price: 12.99,
//     rating: 4.7,
//     downloads: 156,
//     status: "draft",
//     uploadDate: "2024-01-10",
//     preview: "/placeholder.svg?height=60&width=80",
//   },
// ]

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

export function ManageNotes() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<any>(null)
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    subject: "",
    price: "",
    tags: "",
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [viewingNote, setViewingNote] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true)
      try {
        const response = await adminApi.getNotes()
        if (response.success && response.data) {
          setNotes(response.data)
          // DEBUG: Log notes to inspect preview/preview_image
          console.log('Fetched notes:', response.data)
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleView = (note: any) => {
    setViewingNote(note)
    setViewModalOpen(true)
  }

  const handleEdit = (note: any) => {
    setEditingNote(note)
    setEditFormData({
      title: note.title,
      description: note.description,
      subject: note.subject,
      price: note.price.toString(),
      tags: Array.isArray(note.tags) ? note.tags.join(", ") : note.tags || "",
    })
    setEditModalOpen(true)
  }

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingNote) return;
    setIsUpdating(true);
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("title", editFormData.title);
      formData.set("description", editFormData.description);
      formData.set("subject", editFormData.subject);
      formData.set("price", editFormData.price);
      formData.set("tags", editFormData.tags);
      // Only append files if selected
      const pdfInput = e.currentTarget.elements.namedItem("note_file") as HTMLInputElement;
      if (pdfInput && pdfInput.files && pdfInput.files[0]) {
        formData.set("note_file", pdfInput.files[0]);
      }
      const previewInput = e.currentTarget.elements.namedItem("preview_image") as HTMLInputElement;
      if (previewInput && previewInput.files && previewInput.files[0]) {
        formData.set("preview_image", previewInput.files[0]);
      }
      const response = await adminApi.updateNote(editingNote.id, formData);
      if (response.success) {
        setNotes(notes.map(note => {
          if (note.id === editingNote.id) {
            // Preserve file-related properties
            return {
              ...note,
              ...editFormData,
              file_url: note.file_url,
              file: note.file,
              file_name: note.file_name,
              filename: note.filename,
              preview: note.preview,
            };
          }
          return note;
        }));
        setEditModalOpen(false);
        setEditingNote(null);
        toast({
          title: "Note updated",
          description: "The note has been successfully updated.",
        });
      } else {
        throw new Error(response.message || "Failed to update note");
      }
    } catch (error: any) {
      console.error("Failed to update note:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  }

  const handleCloseEditModal = () => {
    setEditModalOpen(false)
    setEditingNote(null)
    setEditFormData({
      title: "",
      description: "",
      subject: "",
      price: "",
      tags: "",
    })
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this note?")) {
      try {
        const response = await adminApi.deleteNote(id)
        if (response.success) {
          setNotes(notes.filter((note) => note.id !== id))
          toast({
            title: "Note deleted",
            description: "The note has been successfully deleted.",
          })
        }
      } catch (error: any) {
        console.error("Failed to delete note:", error)
        toast({
          title: "Error",
          description: "Failed to delete note. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const toggleStatus = async (id: number) => {
    const note = notes.find((n) => n.id === id)
    if (!note) return

    const newStatus = note.status === "active" ? "draft" : "active"

    try {
      const response = await adminApi.updateNoteStatus(id, newStatus)
      if (response.success) {
        setNotes(notes.map((note) => (note.id === id ? { ...note, status: newStatus } : note)))
      }
    } catch (error: any) {
      console.error("Failed to update note status:", error)
      toast({
        title: "Error",
        description: "Failed to update note status.",
        variant: "destructive",
      })
    }
  }

  // Add handler for toggling is_active (restore/soft-delete)
  const handleToggleActive = async (id: number, isActive: boolean) => {
    try {
      // Call backend to update is_active
      const response = await adminApi.updateNote(id, { is_active: !isActive });
      if (response.success) {
        setNotes(notes.map(note => note.id === id ? { ...note, is_active: !isActive } : note));
        toast({
          title: !isActive ? "Note restored" : "Note deactivated",
          description: !isActive ? "The note has been restored and is now active." : "The note has been deactivated (soft deleted).",
        });
      } else {
        throw new Error(response.message || "Failed to update note status");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update note status.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Manage Notes</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Note</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Price (₹)</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-500">Loading notes...</p>
                  </TableCell>
                </TableRow>
              )}
              {filteredNotes.map((note) => (
                <TableRow key={note.id} className={note.is_active === false ? "opacity-60" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={note.preview || note.preview_image || "/placeholder.svg"}
                        alt={note.title}
                        width={60}
                        height={40}
                        className="w-15 h-10 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{note.title}</div>
                        <div className="text-sm text-gray-500">{note.uploadDate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{note.subject}</Badge>
                  </TableCell>
                  <TableCell>₹{note.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {note.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4 text-gray-400" />
                      {note.downloads}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={note.status === "active" ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => toggleStatus(note.id)}
                    >
                      {note.status}
                    </Badge>
                    {note.is_active === false && (
                      <Badge variant="destructive" className="ml-2">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(note)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(note)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(note.id, note.is_active)}
                        className={note.is_active ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                      >
                        {note.is_active ? <Trash2 className="h-4 w-4" /> : <span className="font-bold">↺</span>}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>

    {/* View Note Modal */}
    <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Note Details</DialogTitle>
        </DialogHeader>
        {viewingNote && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">{viewingNote.title}</div>
              </div>
              <div>
                <Label>Subject</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">{viewingNote.subject}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Price (₹)</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">₹{viewingNote.price}</div>
              </div>
              <div>
                <Label>Tags</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">{Array.isArray(viewingNote.tags) ? viewingNote.tags.join(', ') : viewingNote.tags}</div>
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <div className="border rounded px-3 py-2 bg-gray-50 whitespace-pre-line">{viewingNote.description}</div>
            </div>
            <div>
              <Label>Note File (PDF)</Label>
              <div className="border rounded px-3 py-2 bg-gray-50 flex justify-between items-center">
                <span>
                  {viewingNote.file_name ||
                    viewingNote.filename ||
                    (viewingNote.file && viewingNote.file.name) ||
                    "Not available"}
                </span>
                {(viewingNote.file?.url ||
                  viewingNote.file_url ||
                  viewingNote.file_name ||
                  viewingNote.filename ||
                  (viewingNote.file && viewingNote.file.name)) && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      const fileUrl =
                        viewingNote.file?.url ||
                        viewingNote.file_url ||
                        `/files/${
                          viewingNote.file_name ||
                          viewingNote.filename ||
                          (viewingNote.file && viewingNote.file.name)
                        }`;
                      window.open(fileUrl, "_blank", "noopener");
                    }}
                    title="Open PDF in New Tab"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Rating</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">{viewingNote.rating}</div>
              </div>
              <div>
                <Label>Downloads</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">{viewingNote.downloads || viewingNote.download_count}</div>
              </div>
              <div>
                <Label>Status</Label>
                <div className="border rounded px-3 py-2 bg-gray-50">{viewingNote.status}</div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>

    {/* Edit Note Modal */}
    <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            Update the details of your note below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                required
                value={editFormData.title}
                onChange={handleEditFormChange}
                placeholder="Enter note title"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-subject">Subject</Label>
              <Select
                value={editFormData.subject}
                onValueChange={(value) => setEditFormData({ ...editFormData, subject: value })}
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-price">Price (₹)</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                value={editFormData.price}
                onChange={handleEditFormChange}
                placeholder="0.00"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-tags">Tags</Label>
              <Input
                id="edit-tags"
                name="tags"
                value={editFormData.tags}
                onChange={handleEditFormChange}
                placeholder="calculus, derivatives, integrals"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-pdf">Note File (PDF)</Label>
              {(() => {
                const filePath =
                  editingNote?.file_url ||
                  editingNote?.file_name ||
                  editingNote?.filename ||
                  (editingNote?.file && (editingNote.file.url || editingNote.file.name));
                return typeof filePath === 'string' && filePath
                  ? (
                    <div className="mb-2 text-sm text-gray-600">
                      Current file: {filePath.split('/').pop()}
                    </div>
                  )
                  : null;
              })()}
              <Input
                id="edit-pdf"
                name="note_file"
                type="file"
                accept="application/pdf"
              />
            </div>
            <div>
              <Label htmlFor="edit-preview-image">Preview Image</Label>
              {editingNote?.preview && (
                <div className="mb-2 text-sm text-gray-600">
                  Current image: {editingNote.preview.split('/').pop()}
                </div>
              )}
              <Input
                id="edit-preview-image"
                name="preview_image"
                type="file"
                accept="image/*"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              required
              value={editFormData.description}
              onChange={handleEditFormChange}
              placeholder="Describe your note content..."
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseEditModal}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}
