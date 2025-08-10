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
                <span>thecivilstudies@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 7027049101</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Zirakpur, Punjab</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2024 Civil Studies. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/refund-policy" className="hover:text-white transition-colors">
                Refund Policy
              </Link>
              <Link href="/pricing-policy" className="hover:text-white transition-colors">
                Pricing Policy
              </Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
