"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Smartphone, Building, Wallet, Shield } from "lucide-react"

export function PaymentMethods() {
  const paymentMethods = [
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Credit/Debit Cards",
      description: "Visa, Mastercard, RuPay, American Express",
      color: "text-blue-600",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "UPI",
      description: "Google Pay, PhonePe, Paytm, BHIM UPI",
      color: "text-green-600",
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Net Banking",
      description: "All major banks supported",
      color: "text-purple-600",
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Wallets",
      description: "Paytm, Mobikwik, Freecharge, Airtel Money",
      color: "text-orange-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Accepted Payment Methods
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`${method.color} mt-1`}>{method.icon}</div>
              <div>
                <h4 className="font-medium text-sm">{method.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{method.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800 text-center">🔒 All payments are secured with 256-bit SSL encryption</p>
        </div>
      </CardContent>
    </Card>
  )
}
