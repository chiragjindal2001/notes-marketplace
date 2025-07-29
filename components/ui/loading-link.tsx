"use client"

import Link from "next/link"
import { useLoading } from "./loading-provider"
import { ReactNode } from "react"

interface LoadingLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
  [key: string]: any
}

export function LoadingLink({ href, children, className, onClick, ...props }: LoadingLinkProps) {
  const { showLoading } = useLoading()

  const handleClick = () => {
    showLoading()
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
} 