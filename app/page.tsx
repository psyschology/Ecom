import { Suspense } from "react"
import HeroSection from "@/components/HeroSection"
import FeaturedProducts from "@/components/FeaturedProducts"
import CategorySection from "@/components/CategorySection"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <FeaturedProducts />
        </Suspense>
        <CategorySection />
      </main>
      <Footer />
    </div>
  )
}
