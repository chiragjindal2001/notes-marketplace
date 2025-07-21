import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrderConfirmation } from "@/components/order-confirmation"

export default function SuccessPage() {
  // In a real app, you'd get this data from URL params or API
  const mockOrderData = {
    order_id: "ORD-1234567890",
    customer_email: "customer@example.com",
    total_amount: 1180.0,
    items: [
      {
        title: "Advanced Calculus Notes",
        price: 500.0,
        quantity: 1,
      },
      {
        title: "Physics Mechanics",
        price: 500.0,
        quantity: 1,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <OrderConfirmation orderData={mockOrderData} />
      </div>

      <Footer />
    </div>
  )
}
