"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Mail } from "lucide-react"
import { adminApi } from "@/lib/api"

interface NoteItem {
  note_id?: string | number
  title?: string
  name?: string
  note_title?: string
  price?: number
  [key: string]: any
}

interface Order {
  id?: string
  customerEmail?: string
  customerName?: string
  items?: Array<string | NoteItem>
  total?: number | null
  status?: string
  date?: string
  downloadCount?: number
  [key: string]: any
}

export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([])
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
          const rawItems: any[] = response.data.items ?? []

          // Normalize backend items (snake_case) to the UI model (camelCase)
          const normalized: Order[] = rawItems.map((o: any) => {
            const normalizedItems: NoteItem[] = Array.isArray(o.items)
              ? o.items.map((it: any) => ({
                  ...it,
                  // convert price string to number if possible
                  price: it?.price != null ? parseFloat(String(it.price)) : undefined,
                }))
              : []

            return {
              id: o.id ?? o.order_id ?? "-",
              customerEmail: o.customer_email ?? o.customerEmail ?? "",
              customerName: o.customer_name ?? o.customerName ?? "",
              // convert total_amount string to number
              total: o.total_amount != null ? parseFloat(String(o.total_amount)) : typeof o.total === "number" ? o.total : 0,
              status: o.status ?? "unknown",
              // use created_at as date
              date: o.created_at ?? o.date ?? "-",
              items: normalizedItems,
              // backend may not provide downloads, default to 0
              downloadCount: o.download_count != null ? Number(o.download_count) : 0,
              // keep raw object for debugging if needed
              raw: o,
            }
          })

          setOrders(normalized)
          console.log("Fetched & normalized orders:", normalized)
        } else {
          setOrders([])
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const normalizedSearch = searchTerm.trim().toLowerCase()

  const filteredOrders = orders.filter((order) => {
    if (!normalizedSearch) return true
    return (
      (order?.customerEmail || "").toLowerCase().includes(normalizedSearch) ||
      (order?.customerName || "").toLowerCase().includes(normalizedSearch) ||
      (order?.id || "").toLowerCase().includes(normalizedSearch)
    )
  })

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
      case "error":
        return "destructive"
      case "paid":
        // map paid to default or another variant if you like
        return "default"
      default:
        return "secondary"
    }
  }

  const renderItemText = (item: string | NoteItem) => {
    if (typeof item === "string") return item
    return item?.title ?? item?.name ?? item?.note_title ?? JSON.stringify(item)
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

              {!loading && filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-500">No orders found.</p>
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                filteredOrders.map((order) => (
                  <TableRow key={order.id ?? Math.random().toString(36).slice(2)}>
                    <TableCell className="font-medium">{order.id ?? "-"}</TableCell>

                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customerName ?? "-"}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {order.customerEmail ?? "-"}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        {Array.isArray(order.items) && order.items.length > 0 ? (
                          order.items.map((item, index) => {
                            const key = typeof item === "object" ? item.note_id ?? index : index
                            const text = renderItemText(item)
                            return (
                              <div key={key} className="text-sm">
                                {text}
                                {typeof item === "object" && item?.price != null && (
                                  <span className="ml-2 text-xs text-gray-500">— ₹{Number(item.price).toFixed(2)}</span>
                                )}
                              </div>
                            )
                          })
                        ) : (
                          <div className="text-sm text-gray-500">—</div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">
                      ₹{typeof order.total === "number" ? order.total.toFixed(2) : Number(order.total || 0).toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <Badge variant={getStatusColor(order.status)}>{order.status ?? "unknown"}</Badge>
                    </TableCell>

                    <TableCell>{order.date ?? "-"}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4 text-gray-400" />
                        {typeof order.downloadCount === "number" ? order.downloadCount : 0}
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
