"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"

interface CartItem {
  id: string
  note_id: number
  title: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: { id: string; title: string; price: number; image: string }) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getTotal: () => number
  isLoading: boolean
  refreshCart: () => Promise<CartItem[] | undefined>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const refreshCart = async () => {
    if (isLoading) return; // Prevent multiple simultaneous refreshes
    
    setIsLoading(true);
    try {
      console.log('Fetching cart items...');
      const response = await apiClient.get<any>('/cart/');
      console.log('Cart items received:', response);
      
      const cartItems = (response.data || []).map((item: any) => ({
        id: item.id.toString(),
        note_id: item.note_id,
        title: item.note?.title || item.title || "Unknown Note",
        price: item.note?.price || item.price || 0,
        quantity: item.quantity,
        image: item.note?.preview_image || item.image || "/placeholder.svg",
      }));
      
      setItems(cartItems);
      return cartItems;
    } catch (error: any) {
      console.error('Error refreshing cart:', error);
      
      // Don't show error toast for 401 (handled by auth flow)
      if (error.status !== 401) {
        toast({
          title: "Error",
          description: error.message || "Failed to load cart. Please try again.",
          variant: "destructive",
        });
      }
      
      // Clear cart if there was an error (except 401)
      if (error.status !== 401) {
        setItems([]);
      }
      
      throw error; // Re-throw to allow callers to handle the error
    } finally {
      setIsLoading(false);
    }
  }

  // Use localStorage to check if user is authenticated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('user_token');
      if (token) {
        refreshCart().catch(error => {
          console.error('Error in cart refresh effect:', error);
        });
      } else {
        setItems([]);
      }
    }
    // Cleanup function to cancel any pending requests
    return () => {
      // You could add request cancellation logic here if needed
    };
  }, [])

  const addItem = async (item: { id: string; title: string; price: number; image: string }) => {
    setIsLoading(true)
    try {
      await apiClient.post('/cart/', {
        note_id: Number(item.id),
        quantity: 1
      })
      await refreshCart()
      toast({
        title: "Success",
        description: `${item.title} added to cart`,
      })
    } catch (error) {
      console.error("Failed to add item to cart:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add item to cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (id: string) => {
    setIsLoading(true)
    try {
      await apiClient.delete(`/cart/${id}`)
      await refreshCart()
    } catch (error) {
      console.error("Error removing from cart:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove from cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return removeItem(id)
    
    setIsLoading(true)
    try {
      await apiClient.put(`/cart/${id}`, { quantity })
      await refreshCart()
    } catch (error) {
      console.error("Failed to update cart item:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update cart item",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    setIsLoading(true)
    try {
      await apiClient.delete('/cart/clear')
      setItems([])
      toast({
        title: "Success",
        description: "Cart cleared",
      })
    } catch (error) {
      console.error("Failed to clear cart:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to clear cart",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        isLoading,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
