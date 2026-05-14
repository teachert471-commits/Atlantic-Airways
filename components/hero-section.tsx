"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Users, ChevronDown, Search, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

const departureCities = [
  { value: "london", label: "London (LHR)" },
  { value: "manchester", label: "Manchester (MAN)" },
  { value: "birmingham", label: "Birmingham (BHX)" },
]

const destinationCities = [
  { value: "new-york", label: "New York (JFK)" },
  { value: "los-angeles", label: "Los Angeles (LAX)" },
  { value: "miami", label: "Miami (MIA)" },
  { value: "chicago", label: "Chicago (ORD)" },
  { value: "oklahoma", label: "Oklahoma City (OKC)" },
]

const cabinClasses = [
  { value: "economy", label: "Economy" },
  { value: "premium-economy", label: "Premium Economy" },
  { value: "business", label: "Business Class" },
  { value: "first", label: "First Class" },
]

export function HeroSection() {
  const [tripType, setTripType] = useState<"return" | "one-way">("return")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState(1)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-airplane.jpg"
          alt="Luxury airplane flying over the Atlantic Ocean"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-12">
          <p className="text-accent font-medium tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Premium Transatlantic Travel
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight text-balance">
            Fly Beyond Borders
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Luxury flights from the UK to the USA with unmatched comfort and world-class service.
          </p>
        </div>

        {/* Booking Form */}
        <div className="glass rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto">
          {/* Trip Type Toggle */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setTripType("return")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tripType === "return"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Return
            </button>
            <button
              onClick={() => setTripType("one-way")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tripType === "one-way"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              One Way
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Departure City */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">From</label>
              <Select>
                <SelectTrigger className="w-full bg-input border-border text-foreground h-12">
                  <SelectValue placeholder="Select departure" />
                </SelectTrigger>
                <SelectContent>
                  {departureCities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Swap Button (Mobile Hidden) */}
            <div className="hidden lg:flex items-end justify-center pb-3">
              <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Destination City */}
            <div className="space-y-2 lg:col-span-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">To</label>
              <Select>
                <SelectTrigger className="w-full bg-input border-border text-foreground h-12">
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinationCities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cabin Class */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cabin Class</label>
              <Select defaultValue="business">
                <SelectTrigger className="w-full bg-input border-border text-foreground h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cabinClasses.map((cabin) => (
                    <SelectItem key={cabin.value} value={cabin.value}>
                      {cabin.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Departure Date */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Departure</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-input border-border text-foreground h-12"
                  >
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {departureDate ? format(departureDate, "PPP") : <span className="text-muted-foreground">Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Return Date */}
            {tripType === "return" && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Return</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-input border-border text-foreground h-12"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {returnDate ? format(returnDate, "PPP") : <span className="text-muted-foreground">Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Passengers */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Passengers</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-input border-border text-foreground h-12"
                  >
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    {passengers} {passengers === 1 ? "Passenger" : "Passengers"}
                    <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48" align="start">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Adults</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        className="w-8 h-8 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-4 text-center">{passengers}</span>
                      <button
                        onClick={() => setPassengers(Math.min(9, passengers + 1))}
                        className="w-8 h-8 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Link href="/book" className="w-full">
                <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base">
                  <Search className="mr-2 h-5 w-5" />
                  Search Flights
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          {[
            { value: "50+", label: "Daily Flights" },
            { value: "5", label: "US Destinations" },
            { value: "98%", label: "On-Time Rate" },
            { value: "1M+", label: "Happy Travelers" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
