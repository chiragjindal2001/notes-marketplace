"use client"

import type React from "react"

import { CartProvider } from "@/hooks/use-cart"
import { LoadingProvider } from "@/components/ui/loading-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoadingProvider>
      <CartProvider>{children}</CartProvider>
    </LoadingProvider>
  )
}
