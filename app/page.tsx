import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { RoutesSection } from "@/components/routes-section"
import { BusinessSection } from "@/components/business-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <RoutesSection />
      <BusinessSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
