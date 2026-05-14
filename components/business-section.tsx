"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const businessFeatures = [
  "Spacious 180° lie-flat seats",
  "Direct aisle access for every seat",
  "Michelin-star inspired cuisine",
  "Premium wines & champagne selection",
  "18-inch personal entertainment screen",
  "Luxury amenity kit by Aesop",
  "Priority boarding & baggage",
  "Exclusive lounge access worldwide",
]

export function BusinessSection() {
  return (
    <section id="business" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/business-class.jpg"
                alt="Luxury Business Class cabin"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-6 max-w-[280px] hidden md:block">
              <p className="text-sm text-muted-foreground mb-1">Starting from</p>
              <p className="text-3xl font-bold text-foreground mb-1">£2,499</p>
              <p className="text-sm text-muted-foreground">Round trip London to New York</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-accent font-medium tracking-[0.3em] uppercase mb-4">
              Business Class
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Redefine Your Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              Experience the pinnacle of transatlantic travel. Our Business Class offers an 
              exclusive sanctuary where every detail is designed for your ultimate comfort, 
              productivity, and relaxation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {businessFeatures.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-accent" />
                  </div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
                Explore Business Class
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
                View Seat Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
