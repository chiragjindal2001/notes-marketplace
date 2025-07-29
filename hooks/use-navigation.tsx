"use client"

import { useRouter } from "next/navigation"
import { useLoading } from "@/components/ui/loading-provider"

export function useNavigation() {
  const router = useRouter()
  const { showLoading } = useLoading()

  const navigate = (href: string) => {
    showLoading()
    router.push(href)
  }

  const navigateWithCallback = (href: string, callback?: () => void) => {
    showLoading()
    if (callback) {
      callback()
    }
    router.push(href)
  }

  return {
    router,
    navigate,
    navigateWithCallback
  }
} 