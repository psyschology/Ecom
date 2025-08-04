export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  stock: number
  isOnSale?: boolean
  imageUrl?: string
}

export interface Order {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  shippingAddress: {
    address: string
    city: string
    state: string
    pincode: string
  }
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "customer" | "admin"
}
