import Link from "next/link"
import { BookOpen, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Civil Studies</span>
            </div>
            <p className="text-gray-400 mb-4">Premium handwritten notes for civil services preparation.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/browse" className="block text-gray-400 hover:text-white transition-colors">
                Browse Notes
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/admin" className="block text-gray-400 hover:text-white transition-colors">
                Admin Panel
              </Link>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="font-semibold mb-4">Popular Subjects</h3>
            <div className="space-y-2">
              <Link
                href="/browse?subject=history"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                History
              </Link>
              <Link href="/browse?subject=geography" className="block text-gray-400 hover:text-white transition-colors">
                Geography
              </Link>
              <Link href="/browse?subject=polity" className="block text-gray-400 hover:text-white transition-colors">
                Polity
              </Link>
              <Link href="/browse?subject=economics" className="block text-gray-400 hover:text-white transition-colors">
                Economics
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>hello@civilstudies.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Civil Studies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
