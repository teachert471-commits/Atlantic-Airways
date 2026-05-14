"use client"

import { Wifi, Utensils, Armchair, Building2, Headphones } from "lucide-react"

const features = [
  {
    icon: Armchair,
    title: "First-Class Comfort",
    description: "Spacious seats that convert to fully flat beds with premium bedding and personal space.",
  },
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "Stay connected at 35,000 feet with complimentary high-speed internet throughout your journey.",
  },
  {
    icon: Utensils,
    title: "Gourmet Dining",
    description: "Curated menus by world-renowned chefs, paired with fine wines and champagnes.",
  },
  {
    icon: Building2,
    title: "Luxury Lounge Access",
    description: "Relax before your flight in our exclusive lounges with premium amenities and services.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Dedicated concierge service available around the clock for all your travel needs.",
  },
]

export function FeaturesSection() {
  return (
    <section id="flights" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-[0.3em] uppercase mb-4">
            Premium Benefits
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Experience Luxury in Every Detail
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From the moment you book to the second you land, every aspect of your journey is crafted for excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`glass rounded-2xl p-8 group hover:bg-secondary/50 transition-all duration-300 ${
                index === 4 ? "lg:col-start-2" : ""
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
