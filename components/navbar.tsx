"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LoadingLink } from "@/components/ui/loading-link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ShoppingCart, BookOpen, User, LogOut } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { SignOutButton } from "./sign-out-button"
import { logAuthStatus } from "@/lib/auth-utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.length
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('user_token')
      const userData = localStorage.getItem('user')
      setIsLoggedIn(!!token)
      setUser(userData ? JSON.parse(userData) : null)
    }
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Browse Notes", href: "/browse" },
    { name: "About Us", href: "/about" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <LoadingLink href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">Civil Studies</span>
          </LoadingLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <LoadingLink 
                key={item.name} 
                href={item.href} 
                className={`transition-colors ${
                  isActive(item.href) 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </LoadingLink>
            ))}
            {isLoggedIn && (
              <LoadingLink 
                href="/my-notes" 
                className={`transition-colors ${
                  isActive('/my-notes') 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                My Notes
              </LoadingLink>
            )}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm" className="relative">
              <LoadingLink href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </LoadingLink>
            </Button>

            {/* User Login/Logout Button */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm font-medium">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </div>
                <SignOutButton />
              </div>
            ) : (
              <Button asChild variant="outline" size="sm">
                <LoadingLink href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </LoadingLink>
              </Button>
            )}

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <LoadingLink
                      key={item.name}
                      href={item.href}
                      className={`text-lg font-medium ${
                        isActive(item.href) 
                          ? 'text-blue-600' 
                          : 'text-gray-700'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </LoadingLink>
                  ))}
                  {isLoggedIn && (
                    <LoadingLink
                      href="/my-notes"
                      className={`text-lg font-medium ${
                        isActive('/my-notes') 
                          ? 'text-blue-600' 
                          : 'text-gray-700'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      My Notes
                    </LoadingLink>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
