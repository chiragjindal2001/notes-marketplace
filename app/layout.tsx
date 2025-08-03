import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"
import { AuthProvider } from "@/components/auth-provider"
import { TokenHandler } from "@/components/TokenHandler";
import { LoadingHandler } from "@/components/ui/loading-handler";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Civil Studies - Premium Handwritten Notes",
  description:
    "Browse and purchase high-quality handwritten notes for civil services preparation. Digital delivery, instant access.",
  keywords: "civil services notes, IAS notes, IPS notes, study materials, academic notes, digital notes, government services",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TokenHandler />
        <Providers>
          <LoadingHandler />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
