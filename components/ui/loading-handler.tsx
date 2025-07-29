"use client"

import { useEffect } from "react"
import { useLoading } from "./loading-provider"

export function LoadingHandler() {
  const { hideLoading } = useLoading()

  useEffect(() => {
    // Hide loading when component mounts (page is ready)
    hideLoading()
  }, [hideLoading])

  return null
} 