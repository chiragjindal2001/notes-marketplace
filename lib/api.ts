const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sienna-cod-887616.hostingersite.com/api"

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  errors?: string[]
  pagination?: {
    current_page: number
    total_pages: number
    total_items: number
    items_per_page: number
  }
}

class ApiError extends Error {
  constructor(
    public response: ApiResponse,
    public status: number,
  ) {
    super(response.message || "API Error")
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  let headers: HeadersInit = {}

  // Always set Authorization header if user_token is present
  if (typeof window !== 'undefined') {
    const userToken = localStorage?.getItem("user_token");
    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }
    // For admin endpoints, use admin token if available
    if (endpoint.includes("/admin/")) {
      const adminToken = localStorage?.getItem("admin_token");
      if (adminToken) {
        headers.Authorization = `Bearer ${adminToken}`;
      }
    }
  }

  // Only set Content-Type if not sending FormData
  const isFormData = options.body instanceof FormData;
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  // Merge any custom headers passed in options, but do not overwrite Authorization
  headers = { ...options.headers, ...headers };

  const config: RequestInit = {
    ...options,
    headers,
    // Remove credentials: 'include' to ensure Authorization header is sent for CORS
  }

  // Debug log: print headers before fetch
  if (typeof window !== 'undefined') {
    console.log('apiRequest headers:', headers);
  }

  try {
    let response: Response;
    let responseData: any;
    response = await fetch(url, config);
    responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(
        responseData || { success: false, message: `HTTP error ${response.status}` }, 
        response.status
      )
    }

    return responseData as ApiResponse<T>
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      { 
        success: false, 
        message: error instanceof Error ? error.message : "An unknown error occurred" 
      }, 
      0
    )
  }
}



// Notes API
export const notesApi = {
  getAll: (params?: {
    page?: number
    limit?: number
    subject?: string
    search?: string
    sort?: string
    min_price?: number
    max_price?: number
  }) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
    }
    return apiRequest<{ items: any[] }>(`/notes?${searchParams.toString()}`)
  },

  getById: (id: number) => apiRequest<{ note: any; reviews: any[] }>(`/notes/${id}`),

  getSubjects: () => apiRequest<{ subjects: any[] }>("/subjects"),
}

// Cart API
export const cartApi = {
  // Get cart items
  getItems: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest<any[]>("/cart", {
      method: "GET"
    });
  },
  
  // Add item to cart
  addItem: async (noteId: number): Promise<ApiResponse<any>> => {
    return apiRequest("/cart", {
      method: "POST",
      body: JSON.stringify({
        note_id: noteId,
      }),
    });
  },

  // Remove item from cart
  removeItem: async (itemId: number): Promise<ApiResponse<void>> => {
    return apiRequest(`/cart/${itemId}`, {
      method: "DELETE",
    });
  },

  // Clear cart
  clearCart: async (): Promise<ApiResponse<void>> => {
    return apiRequest("/cart", {
      method: "DELETE",
    });
  },
}

// Checkout API
export const checkoutApi = {
  createOrder: (orderData: any) =>
    apiRequest("/checkout/create-order", {
      method: "POST",
      body: JSON.stringify(orderData),
    }),

  verifyPayment: (paymentData: any) =>
    apiRequest("/checkout/verify-payment", {
      method: "POST",
      body: JSON.stringify(paymentData),
    }),
}

// Contact API
export const contactApi = {
  submit: (contactData: any) =>
    apiRequest("/contact", {
      method: "POST",
      body: JSON.stringify(contactData),
    }),
}

// Admin API
export const adminApi = {
  login: (credentials: { username: string; password: string }) =>
    apiRequest("/auth/admin/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getNotes: () => apiRequest<any[]>("/admin/notes"),

  createNote: (formData: FormData) =>
    apiRequest("/admin/notes", {
      method: "POST",
      body: formData,
      headers: {}, // Remove Content-Type to let browser set it for FormData
    }),

  updateNote: (id: number, updates: any) => {
    const isFormData = updates instanceof FormData;
    return apiRequest(`/admin/notes/${id}`, {
      method: isFormData ? "POST" : "PUT",
      body: isFormData ? updates : JSON.stringify(updates),
      headers: isFormData ? {} : undefined,
    });
  },

  deleteNote: (id: number) =>
    apiRequest(`/admin/notes/${id}`, {
      method: "DELETE",
    }),

  updateNoteStatus: (id: number, status: string) =>
    apiRequest(`/admin/notes/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  getOrders: (params?: any) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
    }
    return apiRequest<{ items: any[] }>(`/admin/orders?${searchParams.toString()}`)
  },

  getOrderById: (orderId: string) => apiRequest(`/admin/orders/${orderId}`),

  updateOrderStatus: (orderId: string, status: string) =>
    apiRequest(`/admin/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  processRefund: (refundData: any) =>
    apiRequest("/admin/payments/refund", {
      method: "POST",
      body: JSON.stringify(refundData),
    }),

  getDashboardStats: () => apiRequest("/admin/dashboard/stats"),

  createCoupon: (couponData: any) =>
    apiRequest("/admin/coupons", {
      method: "POST",
      body: JSON.stringify(couponData),
    }),

  getCoupons: () => apiRequest<any[]>("/admin/coupons"),
}

// Coupon API
export const couponApi = {
  validate: (code: string, totalAmount: number) =>
    apiRequest("/coupons/validate", {
      method: "POST",
      body: JSON.stringify({
        code,
        total_amount: totalAmount,
      }),
    }),
}

// User Orders API
export const userOrdersApi = {
  getOrders: (params?: any) => {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
    }
    return apiRequest<{ items: any[] }>(`/orders?${searchParams.toString()}`)
  },

  getOrderById: (orderId: string) => apiRequest(`/orders/${orderId}`),
}

// Auth and session utilities are handled in the apiRequest function
