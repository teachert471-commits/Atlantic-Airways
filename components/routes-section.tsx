"use client"

import Image from "next/image"
import { Clock, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"

const routes = [
  {
    from: "London",
    fromCode: "LHR",
    to: "New York",
    toCode: "JFK",
    image: "/images/new-york.jpg",
    price: 899,
    duration: "7h 30m",
  },
  {
    from: "Manchester",
    fromCode: "MAN",
    to: "Los Angeles",
    toCode: "LAX",
    image: "/images/los-angeles.jpg",
    price: 1099,
    duration: "11h 15m",
  },
  {
    from: "Birmingham",
    fromCode: "BHX",
    to: "Miami",
    toCode: "MIA",
    image: "/images/miami.jpg",
    price: 799,
    duration: "9h 45m",
  },
  {
    from: "London",
    fromCode: "LHR",
    to: "Chicago",
    toCode: "ORD",
    image: "/images/chicago.jpg",
    price: 849,
    duration: "8h 50m",
  },
  {
    from: "London",
    fromCode: "LHR",
    to: "Oklahoma City",
    toCode: "OKC",
    image: "/images/oklahoma.jpg",
    price: 949,
    duration: "10h 20m",
  },
]

export function RoutesSection() {
  return (
    <section id="destinations" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-[0.3em] uppercase mb-4">
            Popular Routes
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Discover Your Next Destination
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our most popular transatlantic routes with competitive prices and unparalleled service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map((route) => (
            <div
              key={`${route.from}-${route.to}`}
              className="group glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={route.image}
                  alt={route.to}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm text-muted-foreground">{route.from}</p>
                        <p className="text-lg font-bold text-foreground">{route.fromCode}</p>
                      </div>
                      <div className="flex items-center gap-2 px-3">
                        <div className="w-8 h-px bg-muted-foreground/50" />
                        <Plane className="h-4 w-4 text-accent rotate-90" />
                        <div className="w-8 h-px bg-muted-foreground/50" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{route.to}</p>
                        <p className="text-lg font-bold text-foreground">{route.toCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{route.duration}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">From </span>
                    <span className="text-2xl font-bold text-foreground">£{route.price}</span>
                  </div>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
