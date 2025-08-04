import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Electronics",
    image: "/placeholder.svg?height=300&width=400",
    href: "/products?category=electronics",
  },
  {
    name: "Clothing",
    image: "/placeholder.svg?height=300&width=400",
    href: "/products?category=clothing",
  },
  {
    name: "Home & Garden",
    image: "/placeholder.svg?height=300&width=400",
    href: "/products?category=home",
  },
]

export default function CategorySection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="relative group overflow-hidden rounded-lg">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
                  <Button asChild variant="secondary">
                    <Link href={category.href}>Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
