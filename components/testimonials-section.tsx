"use client"

import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Thompson",
    role: "Business Executive",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    content: "British Airways has completely transformed my transatlantic travel experience. The Club World service is impeccable, and the crew goes above and beyond every single time.",
  },
  {
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    location: "Manchester, UK",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    content: "I fly to New York monthly, and there's no airline that comes close to the comfort and service BA provides. The lie-flat beds and gourmet dining make the journey a pleasure.",
  },
  {
    name: "Emma Williams",
    role: "Creative Director",
    location: "Birmingham, UK",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    content: "From the airport lounge to landing in Miami, every touchpoint was exceptional. The attention to detail and genuine hospitality sets British Airways apart from any airline I've experienced.",
  },
]

export function TestimonialsSection() {
  return (
    <section id="deals" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-accent font-semibold tracking-wide uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            What our customers say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join millions of satisfied passengers who have chosen British Airways for their travel needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-lg p-8 relative group hover:shadow-lg transition-all duration-300 border border-border"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-accent/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                {`"${testimonial.content}"`}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
