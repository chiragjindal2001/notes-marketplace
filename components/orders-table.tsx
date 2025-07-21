"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Mail } from "lucide-react"
import { adminApi } from "@/lib/api"

// Mock data
// const mockOrders = [
//   {
//     id: "ORD-001",
//     customerEmail: "john@example.com",
//     customerName: "John Doe",
//     items: ["Advanced Calculus Notes", "Physics Mechanics"],
//     total: 28.98,
//     status: "completed",
//     date: "2024-01-15",
//     downloadCount: 3,
//   },
//   {
//     id: "ORD-002",
//     customerEmail: "sarah@example.com",
//     customerName: "Sarah Smith",
//     items: ["Organic Chemistry Complete"],
//     total: 19.99,
//     status: "completed",
//     date: "2024-01-14",
//     downloadCount: 1,
//   },
//   {
//     id: "ORD-003",
//     customerEmail: "mike@example.com",
//     customerName: "Mike Johnson",
//     items: ["Data Structures & Algorithms"],
//     total: 18.99,
//     status: "pending",
//     date: "2024-01-13",
//     downloadCount: 0,
//   },
// ]

export function OrdersTable() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await adminApi.getOrders({
          page: 1,
          limit: 50,
        })
        if (response.success && response.data) {
          setOrders(response.data.items)
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const filteredOrders = orders.filter(
    (order) =>
      order?.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.id?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Downloads</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-500">Loading orders...</p>
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                filteredOrders.map((order: any) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {order.customerEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items?.map((item: any, index: number) => (
                          <div key={index} className="text-sm">
                            {item}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${order.total?.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-gray-400" />
                        {order.downloadCount}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
