import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Database types
export interface Note {
  id: number
  title: string
  description: string
  subject: string
  price: number
  rating: number
  download_count: number
  review_count: number
  preview_image: string
  sample_pages: string[]
  features: string[]
  topics: string[]
  tags: string[]
  note_file_url: string
  status: "active" | "draft" | "inactive"
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_email: string
  customer_name: string
  total_amount: number
  status: "pending" | "completed" | "failed" | "refunded"
  payment_method: string
  razorpay_order_id?: string
  razorpay_payment_id?: string
  payment_details?: any
  refund_details?: any
  download_count: number
  created_at: string
  completed_at: string | null
  refunded_at?: string | null
}

export interface OrderItem {
  id: number
  order_id: string
  note_id: number
  title: string
  price: number
}

export interface CartItem {
  id: number
  session_id: string
  note_id: number
  created_at: string
}

export interface Review {
  id: number
  note_id: number
  customer_name: string
  customer_email: string
  rating: number
  comment: string
  order_id: string
  created_at: string
}

export interface Coupon {
  id: number
  code: string
  type: "percentage" | "fixed"
  value: number
  min_amount: number
  max_uses: number
  used_count: number
  expires_at: string
  created_at: string
}
