import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { PurchaseSection } from "@/components/purchase-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <PurchaseSection />
      <Footer />
    </main>
  )
}
