"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/CartContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            EStore
          </Link>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="text" placeholder="Search products..." className="pl-10" />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block pb-4`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
            <li>
              <Link href="/" className="text-gray-700 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-700 hover:text-primary">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/products?category=electronics" className="text-gray-700 hover:text-primary">
                Electronics
              </Link>
            </li>
            <li>
              <Link href="/products?category=clothing" className="text-gray-700 hover:text-primary">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="/products?category=home" className="text-gray-700 hover:text-primary">
                Home & Garden
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="text" placeholder="Search products..." className="pl-10" />
          </div>
        </div>
      </div>
    </header>
  )
}
