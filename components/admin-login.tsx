"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, BookOpen } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { adminApi, type ApiResponse } from "@/lib/api"

interface AdminLoginData {
  token: string;
  user: {
    id: number;
    username: string;
    role: string;
    // Add more fields if needed
  };
}

interface AdminLoginProps {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await adminApi.login({
        username: credentials.username,
        password: credentials.password,
      }) as ApiResponse<AdminLoginData>

      if (response.success && response.data) {
        // Store the token
        localStorage.setItem("admin_token", response.data.token)
        localStorage.setItem("admin_user", JSON.stringify(response.data.user))

        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard!",
        })

        onLogin()
      } else {
        throw new Error(response.message || "Login failed")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <p className="text-gray-600">Access your dashboard</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter username"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>Signing in...</>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

        
            <Button asChild variant="outline" className="w-full mt-4 bg-white">
              <Link href="/">Go to Home</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  )
}
