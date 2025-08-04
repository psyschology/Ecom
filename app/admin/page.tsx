"use client"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import AdminLogin from "@/components/admin/AdminLogin"
import AdminDashboard from "@/components/admin/AdminDashboard"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
