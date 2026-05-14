"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Users, ChevronDown, Search, ArrowRightLeft, Plane, Clock, Wifi, UtensilsCrossed, Tv, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

const departureCities = [
  { value: "london-lhr", label: "London Heathrow (LHR)", city: "London" },
  { value: "london-lgw", label: "London Gatwick (LGW)", city: "London" },
  { value: "manchester", label: "Manchester (MAN)", city: "Manchester" },
  { value: "edinburgh", label: "Edinburgh (EDI)", city: "Edinburgh" },
  { value: "birmingham", label: "Birmingham (BHX)", city: "Birmingham" },
]

const destinationCities = [
  { value: "new-york-jfk", label: "New York JFK (JFK)", city: "New York" },
  { value: "new-york-ewr", label: "New York Newark (EWR)", city: "New York" },
  { value: "los-angeles", label: "Los Angeles (LAX)", city: "Los Angeles" },
  { value: "miami", label: "Miami (MIA)", city: "Miami" },
  { value: "chicago", label: "Chicago O'Hare (ORD)", city: "Chicago" },
  { value: "oklahoma", label: "Oklahoma City (OKC)", city: "Oklahoma City" },
  { value: "boston", label: "Boston (BOS)", city: "Boston" },
  { value: "san-francisco", label: "San Francisco (SFO)", city: "San Francisco" },
]

const cabinClasses = [
  { value: "economy", label: "Economy" },
  { value: "premium-economy", label: "World Traveller Plus" },
  { value: "business", label: "Club World" },
  { value: "first", label: "First" },
]

// Simulated flight results
const generateFlightResults = (from: string, to: string, date: Date | undefined, cabinClass: string) => {
  if (!from || !to || !date) return []
  
  const basePrices: Record<string, number> = {
    "economy": 449,
    "premium-economy": 899,
    "business": 2499,
    "first": 5999,
  }
  
  const basePrice = basePrices[cabinClass] || 449
  
  return [
    {
      id: "ba-115",
      flightNumber: "BA 115",
      departure: "08:30",
      departureAirport: from.toUpperCase().slice(0, 3),
      arrival: "12:45",
      arrivalAirport: to.toUpperCase().slice(0, 3),
      duration: "8h 15m",
      stops: "Direct",
      aircraft: "Boeing 787-9 Dreamliner",
      price: basePrice,
      priceLabel: "from",
      amenities: ["wifi", "meals", "entertainment"],
      seatsLeft: 4,
    },
    {
      id: "ba-177",
      flightNumber: "BA 177",
      departure: "11:00",
      departureAirport: from.toUpperCase().slice(0, 3),
      arrival: "15:30",
      arrivalAirport: to.toUpperCase().slice(0, 3),
      duration: "8h 30m",
      stops: "Direct",
      aircraft: "Airbus A380",
      price: basePrice + 120,
      priceLabel: "from",
      amenities: ["wifi", "meals", "entertainment"],
      seatsLeft: 7,
    },
    {
      id: "ba-283",
      flightNumber: "BA 283",
      departure: "14:45",
      departureAirport: from.toUpperCase().slice(0, 3),
      arrival: "19:00",
      arrivalAirport: to.toUpperCase().slice(0, 3),
      duration: "8h 15m",
      stops: "Direct",
      aircraft: "Boeing 777-300ER",
      price: basePrice + 85,
      priceLabel: "from",
      amenities: ["wifi", "meals", "entertainment"],
      seatsLeft: 12,
    },
    {
      id: "ba-179",
      flightNumber: "BA 179",
      departure: "18:30",
      departureAirport: from.toUpperCase().slice(0, 3),
      arrival: "23:00",
      arrivalAirport: to.toUpperCase().slice(0, 3),
      duration: "8h 30m",
      stops: "Direct",
      aircraft: "Boeing 787-10 Dreamliner",
      price: basePrice + 45,
      priceLabel: "from",
      amenities: ["wifi", "meals", "entertainment"],
      seatsLeft: 9,
    },
    {
      id: "ba-293",
      flightNumber: "BA 293",
      departure: "21:15",
      departureAirport: from.toUpperCase().slice(0, 3),
      arrival: "01:45+1",
      arrivalAirport: to.toUpperCase().slice(0, 3),
      duration: "8h 30m",
      stops: "Direct",
      aircraft: "Airbus A350-1000",
      price: basePrice - 30,
      priceLabel: "from",
      amenities: ["wifi", "meals", "entertainment"],
      seatsLeft: 2,
      lowestPrice: true,
    },
  ]
}

export function HeroSection() {
  const [tripType, setTripType] = useState<"return" | "one-way">("return")
  const [departure, setDeparture] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState(1)
  const [cabinClass, setCabinClass] = useState("economy")
  const [showResults, setShowResults] = useState(false)
  const [searchComplete, setSearchComplete] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!departure || !destination || !departureDate) return
    setIsSearching(true)
    setShowResults(false)
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false)
      setShowResults(true)
      setSearchComplete(true)
    }, 1500)
  }

  const flightResults = generateFlightResults(departure, destination, departureDate, cabinClass)
  const selectedDeparture = departureCities.find(c => c.value === departure)
  const selectedDestination = destinationCities.find(c => c.value === destination)

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-airplane.jpg"
          alt="British Airways aircraft flying"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-40 pb-12 flex-1">
        {!searchComplete && (
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight text-balance">
              The world is waiting
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto text-pretty">
              Where would you like to go? Search flights to over 200 destinations worldwide.
            </p>
          </div>
        )}

        {/* Search Box */}
        <div className={`bg-card rounded-lg shadow-2xl border border-border overflow-hidden max-w-5xl mx-auto ${searchComplete ? 'mb-8' : ''}`}>
          {/* Trip Type Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setTripType("return")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative ${
                tripType === "return"
                  ? "text-foreground bg-secondary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
              }`}
            >
              Return
              {tripType === "return" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
            <button
              onClick={() => setTripType("one-way")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors relative ${
                tripType === "one-way"
                  ? "text-foreground bg-secondary/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
              }`}
            >
              One way
              {tripType === "one-way" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
            <button
              className="flex-1 px-6 py-4 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-colors"
            >
              Multi-city
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
              {/* From */}
              <div className="lg:col-span-3">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">From</label>
                <Select value={departure} onValueChange={setDeparture}>
                  <SelectTrigger className="w-full bg-input border-border text-foreground h-12">
                    <SelectValue placeholder="Select airport" />
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

              {/* Swap */}
              <div className="hidden lg:flex items-end justify-center pb-1">
                <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* To */}
              <div className="lg:col-span-3">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">To</label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger className="w-full bg-input border-border text-foreground h-12">
                    <SelectValue placeholder="Select airport" />
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

              {/* Dates */}
              <div className="lg:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Depart</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-input border-border text-foreground h-12"
                    >
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      {departureDate ? format(departureDate, "dd MMM") : <span className="text-muted-foreground">Select</span>}
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

              {tripType === "return" && (
                <div className="lg:col-span-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Return</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-input border-border text-foreground h-12"
                      >
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {returnDate ? format(returnDate, "dd MMM") : <span className="text-muted-foreground">Select</span>}
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
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Passengers */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Passengers</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-input border-border text-foreground h-12"
                    >
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      {passengers} {passengers === 1 ? "Adult" : "Adults"}
                      <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64" align="start">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Adults</p>
                          <p className="text-xs text-muted-foreground">16+ years</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setPassengers(Math.max(1, passengers - 1))}
                            className="w-8 h-8 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-4 text-center font-medium">{passengers}</span>
                          <button
                            onClick={() => setPassengers(Math.min(9, passengers + 1))}
                            className="w-8 h-8 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Cabin Class */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Cabin</label>
                <Select value={cabinClass} onValueChange={setCabinClass}>
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

              {/* Search Button */}
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={!departure || !destination || !departureDate || isSearching}
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base disabled:opacity-50"
                >
                  {isSearching ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Search flights
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Results */}
        {showResults && flightResults.length > 0 && (
          <div className="max-w-5xl mx-auto mt-6">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {selectedDeparture?.city} to {selectedDestination?.city}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {departureDate && format(departureDate, "EEEE, d MMMM yyyy")} · {passengers} {passengers === 1 ? "passenger" : "passengers"} · {cabinClasses.find(c => c.value === cabinClass)?.label}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{flightResults.length} flights found</p>
            </div>

            {/* Flight Cards */}
            <div className="space-y-3">
              {flightResults.map((flight) => (
                <div
                  key={flight.id}
                  className={`bg-card rounded-lg border ${flight.lowestPrice ? 'border-accent' : 'border-border'} overflow-hidden hover:shadow-lg transition-shadow group`}
                >
                  {flight.lowestPrice && (
                    <div className="bg-accent text-accent-foreground text-xs font-semibold px-4 py-1">
                      Lowest price
                    </div>
                  )}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                      {/* Flight Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                              <Plane className="h-4 w-4 text-accent rotate-[-30deg]" />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">{flight.flightNumber}</span>
                          </div>
                          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{flight.aircraft}</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-foreground">{flight.departure}</p>
                            <p className="text-sm text-muted-foreground">{flight.departureAirport}</p>
                          </div>
                          
                          <div className="flex-1 flex items-center gap-2 px-4">
                            <div className="flex-1 h-px bg-border relative">
                              <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground rotate-90" />
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-2xl font-bold text-foreground">{flight.arrival}</p>
                            <p className="text-sm text-muted-foreground">{flight.arrivalAirport}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {flight.duration}
                          </div>
                          <span className="text-sm text-green-500 font-medium">{flight.stops}</span>
                          <div className="flex items-center gap-2">
                            {flight.amenities.includes("wifi") && <Wifi className="h-4 w-4 text-muted-foreground" />}
                            {flight.amenities.includes("meals") && <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />}
                            {flight.amenities.includes("entertainment") && <Tv className="h-4 w-4 text-muted-foreground" />}
                          </div>
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between lg:flex-col lg:items-end gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border lg:pl-8">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{flight.priceLabel}</p>
                          <p className="text-3xl font-bold text-foreground">£{flight.price}</p>
                          <p className="text-xs text-muted-foreground">per person</p>
                          {flight.seatsLeft <= 4 && (
                            <p className="text-xs text-accent font-medium mt-1">{flight.seatsLeft} seats left</p>
                          )}
                        </div>
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                          Select
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats - Show only before search */}
        {!searchComplete && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {[
              { value: "200+", label: "Destinations" },
              { value: "280", label: "Aircraft" },
              { value: "100+", label: "Years of heritage" },
              { value: "45M", label: "Customers annually" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
