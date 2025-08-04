import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="hero-gradient text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to EStore</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">Discover amazing products at unbeatable prices</p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
          >
            <Link href="/products?featured=true">Featured Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
