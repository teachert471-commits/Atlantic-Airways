"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Plane, ArrowLeft, Calendar, Users, CreditCard, User, Mail, Phone, Lock, Check, ChevronRight,
  Armchair, UtensilsCrossed, Accessibility, Shield, Clock, MapPin, Luggage, Wifi, Globe,
  FileText, Download, Printer, Bell, CheckCircle2, Circle, ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const steps = [
  { id: 1, name: "Flights", icon: Plane, description: "Select your flight" },
  { id: 2, name: "Passengers", icon: Users, description: "Traveller details" },
  { id: 3, name: "Extras", icon: Armchair, description: "Seats & meals" },
  { id: 4, name: "Payment", icon: CreditCard, description: "Secure checkout" },
  { id: 5, name: "Confirmation", icon: Check, description: "Booking complete" },
]

const flightOptions = [
  {
    id: "flight-1",
    flightNumber: "AC101",
    departure: "06:30",
    arrival: "10:45",
    duration: "8h 15m",
    stops: "Direct",
    price: 749,
    class: "Economy",
    aircraft: "Boeing 787-9 Dreamliner",
    amenities: ["Wi-Fi", "Entertainment", "USB Power"],
  },
  {
    id: "flight-2",
    flightNumber: "AC205",
    departure: "11:00",
    arrival: "15:30",
    duration: "8h 30m",
    stops: "Direct",
    price: 899,
    class: "Premium Economy",
    aircraft: "Airbus A380",
    amenities: ["Wi-Fi", "Premium Dining", "Extra Legroom", "Priority Boarding"],
  },
  {
    id: "flight-3",
    flightNumber: "AC301",
    departure: "14:00",
    arrival: "18:30",
    duration: "8h 30m",
    stops: "Direct",
    price: 1899,
    class: "Business",
    aircraft: "Boeing 777-300ER",
    amenities: ["Wi-Fi", "Lie-flat Bed", "Fine Dining", "Lounge Access", "Fast Track"],
  },
  {
    id: "flight-4",
    flightNumber: "AC401",
    departure: "21:45",
    arrival: "02:15+1",
    duration: "8h 30m",
    stops: "Direct",
    price: 3499,
    class: "First Class",
    aircraft: "Boeing 787-9 Dreamliner",
    amenities: ["Private Suite", "Onboard Chef", "Chauffeur Service", "Spa Access"],
  },
]

const seatMap = {
  business: [
    { row: "1", seats: ["A", "B", null, "C", "D"] },
    { row: "2", seats: ["A", "B", null, "C", "D"] },
    { row: "3", seats: ["A", "B", null, "C", "D"] },
  ],
  economy: [
    { row: "10", seats: ["A", "B", "C", null, "D", "E", "F"] },
    { row: "11", seats: ["A", "B", "C", null, "D", "E", "F"] },
    { row: "12", seats: ["A", "B", "C", null, "D", "E", "F"] },
    { row: "13", seats: ["A", "B", "C", null, "D", "E", "F"] },
    { row: "14", seats: ["A", "B", "C", null, "D", "E", "F"] },
    { row: "15", seats: ["A", "B", "C", null, "D", "E", "F"] },
  ],
}

const mealOptions = [
  { id: "standard", name: "Standard Meal", description: "Chef-prepared main course", price: 0, icon: UtensilsCrossed },
  { id: "vegetarian", name: "Vegetarian", description: "Plant-based gourmet option", price: 0, icon: UtensilsCrossed },
  { id: "halal", name: "Halal", description: "Halal-certified cuisine", price: 0, icon: UtensilsCrossed },
  { id: "kosher", name: "Kosher", description: "Kosher-certified cuisine", price: 0, icon: UtensilsCrossed },
  { id: "premium", name: "Premium Dining", description: "Multi-course gourmet experience", price: 45, icon: UtensilsCrossed },
]

const occupiedSeats = ["1A", "1D", "2B", "3C", "10A", "10F", "11C", "12B", "12E", "13A", "14D", "15F"]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null)
  const [selectedMeal, setSelectedMeal] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [specialAssistance, setSpecialAssistance] = useState<string[]>([])
  const [addBaggage, setAddBaggage] = useState(false)
  const [addLounge, setAddLounge] = useState(false)
  const [addInsurance, setAddInsurance] = useState(false)
  
  const [passengerInfo, setPassengerInfo] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    passportExpiry: "",
    frequentFlyer: "",
  })
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const [billingAddress, setBillingAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    postcode: "",
    country: "United Kingdom",
  })

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const toggleAssistance = (value: string) => {
    setSpecialAssistance(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const selectedFlightData = flightOptions.find((f) => f.id === selectedFlight)
  const selectedMealData = mealOptions.find((m) => m.id === selectedMeal)
  
  // Calculate total price
  const basePrice = selectedFlightData?.price || 0
  const seatPrice = selectedSeat ? (selectedSeat.includes("A") || selectedSeat.includes("F") ? 35 : selectedSeat.includes("B") || selectedSeat.includes("E") ? 0 : 15) : 0
  const mealPrice = selectedMealData?.price || 0
  const baggagePrice = addBaggage ? 65 : 0
  const loungePrice = addLounge ? 55 : 0
  const insurancePrice = addInsurance ? 29 : 0
  const taxes = Math.round(basePrice * 0.12)
  const totalPrice = basePrice + seatPrice + mealPrice + baggagePrice + loungePrice + insurancePrice + taxes

  const bookingRef = "ACA-" + Math.random().toString(36).substring(2, 8).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass fixed top-0 left-0 right-0 z-50 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/30 transition-colors" />
                <Plane className="relative h-7 w-7 text-primary rotate-[-30deg]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold tracking-tight text-foreground">Atlantic Crown</span>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Airways</span>
              </div>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Tracker - British Airways Style */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            {/* Mobile Progress */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Step {currentStep} of 5</span>
                <span className="text-sm text-muted-foreground">{steps[currentStep - 1].name}</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-500 rounded-full"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Desktop Progress */}
            <div className="hidden sm:block">
              <div className="flex items-center justify-between relative">
                {/* Progress Line Background */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-secondary" />
                {/* Progress Line Active */}
                <div 
                  className="absolute top-5 left-0 h-0.5 bg-accent transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
                />

                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentStep > step.id
                          ? "bg-accent text-accent-foreground"
                          : currentStep === step.id
                          ? "bg-accent text-accent-foreground ring-4 ring-accent/30"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <step.icon className="h-4 w-4" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium transition-colors ${
                        currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground hidden lg:block">
                      {step.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-36 sm:pt-44 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Step Content */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Flight Selection */}
              {currentStep === 1 && (
                <>
                  {/* Flight Route Header */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                          <Plane className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-foreground">London to New York</h2>
                          <p className="text-sm text-muted-foreground">Thursday, May 15, 2026 | 1 Adult</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary w-fit">
                        Modify Search
                      </Button>
                    </div>
                  </div>

                  {/* Flight Options */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Available Flights</h3>
                    {flightOptions.map((flight) => (
                      <div
                        key={flight.id}
                        onClick={() => setSelectedFlight(flight.id)}
                        className={`glass rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
                          selectedFlight === flight.id
                            ? "ring-2 ring-accent"
                            : "hover:ring-1 hover:ring-accent/50"
                        }`}
                      >
                        {/* Flight Header */}
                        <div className={`px-4 py-2 text-xs font-medium ${
                          flight.class === "First Class" ? "bg-amber-500/20 text-amber-400" :
                          flight.class === "Business" ? "bg-accent/20 text-accent" :
                          flight.class === "Premium Economy" ? "bg-primary/20 text-primary" :
                          "bg-secondary text-muted-foreground"
                        }`}>
                          {flight.class} | {flight.flightNumber} | {flight.aircraft}
                        </div>
                        
                        <div className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            {/* Time and Route */}
                            <div className="flex items-center gap-4 sm:gap-8">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-foreground">{flight.departure}</p>
                                <p className="text-sm text-muted-foreground">LHR</p>
                                <p className="text-xs text-muted-foreground">London</p>
                              </div>
                              
                              <div className="flex flex-col items-center flex-1 min-w-[100px]">
                                <p className="text-xs text-muted-foreground mb-2">{flight.duration}</p>
                                <div className="flex items-center gap-1 w-full">
                                  <div className="w-2 h-2 rounded-full bg-accent" />
                                  <div className="flex-1 h-px bg-border relative">
                                    <Plane className="h-3 w-3 text-accent absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                                  </div>
                                  <div className="w-2 h-2 rounded-full bg-accent" />
                                </div>
                                <p className="text-xs text-accent mt-2 font-medium">{flight.stops}</p>
                              </div>
                              
                              <div className="text-center">
                                <p className="text-2xl font-bold text-foreground">{flight.arrival}</p>
                                <p className="text-sm text-muted-foreground">JFK</p>
                                <p className="text-xs text-muted-foreground">New York</p>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6">
                              <p className="text-3xl font-bold text-foreground">£{flight.price}</p>
                              <p className="text-xs text-muted-foreground">per person</p>
                              {selectedFlight === flight.id && (
                                <div className="mt-2 inline-flex items-center gap-1 text-xs text-accent font-medium">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Selected
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Amenities */}
                          <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-3">
                            {flight.amenities.map((amenity) => (
                              <span key={amenity} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                                {amenity === "Wi-Fi" && <Wifi className="h-3 w-3" />}
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Step 2: Passenger Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {/* Passenger Details Card */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <User className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Passenger 1 (Adult)</h2>
                        <p className="text-sm text-muted-foreground">Enter details exactly as shown on passport</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Name Row */}
                      <div className="grid grid-cols-4 sm:grid-cols-12 gap-4">
                        <div className="col-span-4 sm:col-span-2 space-y-2">
                          <Label className="text-sm font-medium text-foreground">Title</Label>
                          <Select value={passengerInfo.title} onValueChange={(v) => setPassengerInfo({...passengerInfo, title: v})}>
                            <SelectTrigger className="bg-input border-border text-foreground h-12">
                              <SelectValue placeholder="Title" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mr">Mr</SelectItem>
                              <SelectItem value="mrs">Mrs</SelectItem>
                              <SelectItem value="ms">Ms</SelectItem>
                              <SelectItem value="miss">Miss</SelectItem>
                              <SelectItem value="dr">Dr</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-4 sm:col-span-5 space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name(s)</Label>
                          <Input
                            id="firstName"
                            placeholder="As shown on passport"
                            value={passengerInfo.firstName}
                            onChange={(e) => setPassengerInfo({ ...passengerInfo, firstName: e.target.value })}
                            className="bg-input border-border text-foreground h-12"
                          />
                        </div>
                        <div className="col-span-4 sm:col-span-5 space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
                          <Input
                            id="lastName"
                            placeholder="As shown on passport"
                            value={passengerInfo.lastName}
                            onChange={(e) => setPassengerInfo({ ...passengerInfo, lastName: e.target.value })}
                            className="bg-input border-border text-foreground h-12"
                          />
                        </div>
                      </div>
                      
                      {/* Contact Info */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={passengerInfo.email}
                              onChange={(e) => setPassengerInfo({ ...passengerInfo, email: e.target.value })}
                              className="pl-10 bg-input border-border text-foreground h-12"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Booking confirmation will be sent here</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+44 7700 900000"
                              value={passengerInfo.phone}
                              onChange={(e) => setPassengerInfo({ ...passengerInfo, phone: e.target.value })}
                              className="pl-10 bg-input border-border text-foreground h-12"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">For flight updates and notifications</p>
                        </div>
                      </div>
                      
                      {/* Date of Birth & Nationality */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dob" className="text-sm font-medium text-foreground">Date of Birth</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="dob"
                              type="date"
                              value={passengerInfo.dateOfBirth}
                              onChange={(e) => setPassengerInfo({ ...passengerInfo, dateOfBirth: e.target.value })}
                              className="pl-10 bg-input border-border text-foreground h-12"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-foreground">Nationality</Label>
                          <Select value={passengerInfo.nationality} onValueChange={(v) => setPassengerInfo({...passengerInfo, nationality: v})}>
                            <SelectTrigger className="bg-input border-border text-foreground h-12">
                              <SelectValue placeholder="Select nationality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gb">United Kingdom</SelectItem>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ie">Ireland</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Travel Documents Card */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Travel Documents</h2>
                        <p className="text-sm text-muted-foreground">Passport details for international travel</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="passport" className="text-sm font-medium text-foreground">Passport Number</Label>
                        <Input
                          id="passport"
                          placeholder="AB1234567"
                          value={passengerInfo.passportNumber}
                          onChange={(e) => setPassengerInfo({ ...passengerInfo, passportNumber: e.target.value })}
                          className="bg-input border-border text-foreground h-12 uppercase"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passportExpiry" className="text-sm font-medium text-foreground">Passport Expiry Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="passportExpiry"
                            type="date"
                            value={passengerInfo.passportExpiry}
                            onChange={(e) => setPassengerInfo({ ...passengerInfo, passportExpiry: e.target.value })}
                            className="pl-10 bg-input border-border text-foreground h-12"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <p className="text-sm text-amber-400">
                        Your passport must be valid for at least 6 months beyond your travel date for entry into the United States.
                      </p>
                    </div>
                  </div>

                  {/* Frequent Flyer */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Frequent Flyer (Optional)</h2>
                        <p className="text-sm text-muted-foreground">Earn miles on this flight</p>
                      </div>
                    </div>
                    
                    <Input
                      placeholder="Enter your Atlantic Crown Airways membership number"
                      value={passengerInfo.frequentFlyer}
                      onChange={(e) => setPassengerInfo({ ...passengerInfo, frequentFlyer: e.target.value })}
                      className="bg-input border-border text-foreground h-12"
                    />
                  </div>

                  {/* Special Assistance */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Accessibility className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Special Assistance (Optional)</h2>
                        <p className="text-sm text-muted-foreground">Let us know if you need any additional support</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { id: "wheelchair", label: "Wheelchair assistance" },
                        { id: "visual", label: "Visual impairment support" },
                        { id: "hearing", label: "Hearing impairment support" },
                        { id: "medical", label: "Medical equipment" },
                      ].map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => toggleAssistance(item.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            specialAssistance.includes(item.id) 
                              ? "bg-accent/20 border border-accent" 
                              : "bg-secondary/50 border border-transparent hover:border-accent/50"
                          }`}
                        >
                          <Checkbox 
                            checked={specialAssistance.includes(item.id)}
                            className="border-border"
                          />
                          <span className="text-sm text-foreground">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Extras - Seats & Meals */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Seat Selection */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Armchair className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Choose Your Seat</h2>
                        <p className="text-sm text-muted-foreground">Select your preferred seat on the aircraft</p>
                      </div>
                    </div>

                    {/* Seat Legend */}
                    <div className="flex flex-wrap gap-4 mb-6 p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-secondary border border-border" />
                        <span className="text-xs text-muted-foreground">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-accent" />
                        <span className="text-xs text-muted-foreground">Selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-muted-foreground/30" />
                        <span className="text-xs text-muted-foreground">Occupied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary/30 border border-primary" />
                        <span className="text-xs text-muted-foreground">Extra Legroom (+£35)</span>
                      </div>
                    </div>

                    {/* Seat Map */}
                    <div className="flex flex-col items-center gap-2 p-4 bg-secondary/30 rounded-xl">
                      {/* Plane nose indicator */}
                      <div className="w-16 h-8 rounded-t-full bg-secondary border-x border-t border-border mb-2" />
                      <p className="text-xs text-muted-foreground mb-4">Front of aircraft</p>
                      
                      {/* Economy Seats */}
                      {seatMap.economy.map((row) => (
                        <div key={row.row} className="flex items-center gap-1">
                          <span className="w-6 text-xs text-muted-foreground text-right">{row.row}</span>
                          <div className="flex gap-1">
                            {row.seats.map((seat, idx) => {
                              if (seat === null) {
                                return <div key={idx} className="w-8 h-8" /> // Aisle
                              }
                              const seatId = `${row.row}${seat}`
                              const isOccupied = occupiedSeats.includes(seatId)
                              const isSelected = selectedSeat === seatId
                              const isWindow = seat === "A" || seat === "F"
                              
                              return (
                                <button
                                  key={seat}
                                  disabled={isOccupied}
                                  onClick={() => setSelectedSeat(isSelected ? null : seatId)}
                                  className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                                    isOccupied 
                                      ? "bg-muted-foreground/30 text-muted-foreground cursor-not-allowed"
                                      : isSelected
                                      ? "bg-accent text-accent-foreground"
                                      : isWindow
                                      ? "bg-primary/30 border border-primary text-primary hover:bg-primary/40"
                                      : "bg-secondary border border-border text-muted-foreground hover:border-accent"
                                  }`}
                                >
                                  {seat}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedSeat && (
                      <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Seat {selectedSeat} selected</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedSeat.includes("A") || selectedSeat.includes("F") ? "Window seat with extra legroom" : 
                             selectedSeat.includes("C") || selectedSeat.includes("D") ? "Aisle seat" : "Middle seat"}
                          </p>
                        </div>
                        <p className="text-lg font-semibold text-accent">
                          +£{selectedSeat.includes("A") || selectedSeat.includes("F") ? 35 : selectedSeat.includes("B") || selectedSeat.includes("E") ? 0 : 15}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Meal Selection */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <UtensilsCrossed className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Meal Preference</h2>
                        <p className="text-sm text-muted-foreground">Choose your in-flight dining option</p>
                      </div>
                    </div>

                    <RadioGroup value={selectedMeal} onValueChange={setSelectedMeal} className="space-y-3">
                      {mealOptions.map((meal) => (
                        <div 
                          key={meal.id}
                          className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                            selectedMeal === meal.id 
                              ? "bg-accent/10 border border-accent" 
                              : "bg-secondary/50 border border-transparent hover:border-accent/50"
                          }`}
                          onClick={() => setSelectedMeal(meal.id)}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={meal.id} id={meal.id} />
                            <div>
                              <p className="text-sm font-medium text-foreground">{meal.name}</p>
                              <p className="text-xs text-muted-foreground">{meal.description}</p>
                            </div>
                          </div>
                          {meal.price > 0 ? (
                            <span className="text-sm font-medium text-accent">+£{meal.price}</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">Included</span>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Additional Extras */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Enhance Your Journey</h2>
                    
                    <div className="space-y-3">
                      {/* Extra Baggage */}
                      <div 
                        onClick={() => setAddBaggage(!addBaggage)}
                        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                          addBaggage 
                            ? "bg-accent/10 border border-accent" 
                            : "bg-secondary/50 border border-transparent hover:border-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox checked={addBaggage} className="border-border" />
                          <div className="flex items-center gap-3">
                            <Luggage className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Extra Checked Bag (23kg)</p>
                              <p className="text-xs text-muted-foreground">Add an additional checked bag to your booking</p>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-accent">+£65</span>
                      </div>

                      {/* Lounge Access */}
                      <div 
                        onClick={() => setAddLounge(!addLounge)}
                        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                          addLounge 
                            ? "bg-accent/10 border border-accent" 
                            : "bg-secondary/50 border border-transparent hover:border-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox checked={addLounge} className="border-border" />
                          <div className="flex items-center gap-3">
                            <Armchair className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Crown Lounge Access</p>
                              <p className="text-xs text-muted-foreground">Relax in our premium lounge before your flight</p>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-accent">+£55</span>
                      </div>

                      {/* Travel Insurance */}
                      <div 
                        onClick={() => setAddInsurance(!addInsurance)}
                        className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                          addInsurance 
                            ? "bg-accent/10 border border-accent" 
                            : "bg-secondary/50 border border-transparent hover:border-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox checked={addInsurance} className="border-border" />
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">Travel Protection</p>
                              <p className="text-xs text-muted-foreground">Comprehensive cover for your journey</p>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-accent">+£29</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
                        <p className="text-sm text-muted-foreground">All transactions are secure and encrypted</p>
                      </div>
                    </div>

                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-secondary h-12">
                        <TabsTrigger value="card" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                          Credit/Debit Card
                        </TabsTrigger>
                        <TabsTrigger value="paypal" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                          PayPal
                        </TabsTrigger>
                        <TabsTrigger value="applepay" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                          Apple Pay
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="mt-6 space-y-4">
                        {/* Card Number */}
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber" className="text-sm font-medium text-foreground">Card Number</Label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                              className="pl-10 bg-input border-border text-foreground h-12"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                              <div className="w-8 h-5 bg-blue-600 rounded text-[8px] text-white flex items-center justify-center font-bold">VISA</div>
                              <div className="w-8 h-5 bg-red-500 rounded text-[8px] text-white flex items-center justify-center font-bold">MC</div>
                              <div className="w-8 h-5 bg-blue-400 rounded text-[8px] text-white flex items-center justify-center font-bold">AMEX</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Cardholder Name */}
                        <div className="space-y-2">
                          <Label htmlFor="cardName" className="text-sm font-medium text-foreground">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="Name as shown on card"
                            value={paymentInfo.cardName}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                            className="bg-input border-border text-foreground h-12 uppercase"
                          />
                        </div>
                        
                        {/* Expiry & CVV */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry" className="text-sm font-medium text-foreground">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={paymentInfo.expiry}
                              onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                              className="bg-input border-border text-foreground h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv" className="text-sm font-medium text-foreground">Security Code (CVV)</Label>
                            <div className="relative">
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={paymentInfo.cvv}
                                onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                className="bg-input border-border text-foreground h-12"
                              />
                              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="paypal" className="mt-6">
                        <div className="text-center py-8">
                          <div className="w-16 h-16 rounded-full bg-[#003087] flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">PP</span>
                          </div>
                          <p className="text-foreground mb-2">Pay securely with PayPal</p>
                          <p className="text-sm text-muted-foreground mb-4">You will be redirected to PayPal to complete your payment</p>
                          <Button className="bg-[#003087] hover:bg-[#002570] text-white px-8">
                            Continue with PayPal
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="applepay" className="mt-6">
                        <div className="text-center py-8">
                          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-2xl"></span>
                          </div>
                          <p className="text-foreground mb-2">Pay with Apple Pay</p>
                          <p className="text-sm text-muted-foreground mb-4">Use Face ID or Touch ID to complete payment</p>
                          <Button className="bg-black hover:bg-black/80 text-white px-8">
                            Pay with  Pay
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Billing Address */}
                  {paymentMethod === "card" && (
                    <div className="glass rounded-xl p-4 sm:p-6">
                      <h2 className="text-lg font-semibold text-foreground mb-4">Billing Address</h2>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address1" className="text-sm font-medium text-foreground">Address Line 1</Label>
                          <Input
                            id="address1"
                            placeholder="House number and street name"
                            value={billingAddress.line1}
                            onChange={(e) => setBillingAddress({ ...billingAddress, line1: e.target.value })}
                            className="bg-input border-border text-foreground h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address2" className="text-sm font-medium text-foreground">Address Line 2 (Optional)</Label>
                          <Input
                            id="address2"
                            placeholder="Apartment, suite, unit, etc."
                            value={billingAddress.line2}
                            onChange={(e) => setBillingAddress({ ...billingAddress, line2: e.target.value })}
                            className="bg-input border-border text-foreground h-12"
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium text-foreground">City</Label>
                            <Input
                              id="city"
                              placeholder="London"
                              value={billingAddress.city}
                              onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                              className="bg-input border-border text-foreground h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postcode" className="text-sm font-medium text-foreground">Postcode</Label>
                            <Input
                              id="postcode"
                              placeholder="SW1A 1AA"
                              value={billingAddress.postcode}
                              onChange={(e) => setBillingAddress({ ...billingAddress, postcode: e.target.value })}
                              className="bg-input border-border text-foreground h-12"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 border border-border">
                    <Shield className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Your payment is secure</p>
                      <p className="text-xs text-muted-foreground">
                        All transactions are protected with 256-bit SSL encryption. We never store your full card details 
                        and your payment information is processed securely through our PCI DSS compliant payment provider.
                      </p>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="flex items-start gap-3">
                    <Checkbox id="terms" className="border-border mt-1" />
                    <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I have read and agree to the <Link href="#" className="text-accent hover:underline">Terms & Conditions</Link>, 
                      <Link href="#" className="text-accent hover:underline"> Privacy Policy</Link>, and 
                      <Link href="#" className="text-accent hover:underline"> Fare Rules</Link>. I understand that my booking 
                      is subject to the carrier conditions of carriage.
                    </label>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {/* Success Banner */}
                  <div className="glass rounded-xl p-6 sm:p-8 text-center bg-gradient-to-br from-accent/20 to-transparent border border-accent/30">
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 ring-4 ring-accent/30">
                      <Check className="h-10 w-10 text-accent" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
                    <p className="text-muted-foreground mb-4">
                      Thank you for choosing Atlantic Crown Airways
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-mono text-lg">
                      <span>Booking Reference:</span>
                      <span className="font-bold">{bookingRef}</span>
                    </div>
                  </div>

                  {/* Booking Timeline / Tracking */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-6">Booking Timeline</h3>
                    
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
                      
                      <div className="space-y-6">
                        {/* Booking Confirmed */}
                        <div className="flex gap-4 relative">
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 z-10">
                            <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="text-sm font-medium text-foreground">Booking Confirmed</p>
                            <p className="text-xs text-muted-foreground">May 14, 2026 at 3:42 PM</p>
                            <p className="text-xs text-accent mt-1">Confirmation email sent to {passengerInfo.email || "your email"}</p>
                          </div>
                        </div>

                        {/* E-Ticket Issued */}
                        <div className="flex gap-4 relative">
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 z-10">
                            <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="text-sm font-medium text-foreground">E-Ticket Issued</p>
                            <p className="text-xs text-muted-foreground">May 14, 2026 at 3:42 PM</p>
                            <p className="text-xs text-accent mt-1">Your e-ticket is ready to download</p>
                          </div>
                        </div>

                        {/* Check-in Opens */}
                        <div className="flex gap-4 relative">
                          <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0 z-10">
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="text-sm font-medium text-muted-foreground">Online Check-in Opens</p>
                            <p className="text-xs text-muted-foreground">May 14, 2026 at 6:30 AM (24 hours before departure)</p>
                            <p className="text-xs text-muted-foreground mt-1">We will send you a reminder</p>
                          </div>
                        </div>

                        {/* Departure */}
                        <div className="flex gap-4 relative">
                          <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0 z-10">
                            <Plane className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-muted-foreground">Departure</p>
                            <p className="text-xs text-muted-foreground">May 15, 2026 at {selectedFlightData?.departure || "14:00"}</p>
                            <p className="text-xs text-muted-foreground mt-1">London Heathrow (LHR) Terminal 5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flight Details Summary */}
                  <div className="glass rounded-xl p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Flight Details</h3>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-secondary/30">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{selectedFlightData?.departure || "14:00"}</p>
                          <p className="text-sm font-medium text-muted-foreground">LHR</p>
                          <p className="text-xs text-muted-foreground">London</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <Plane className="h-5 w-5 text-accent mb-1" />
                          <p className="text-xs text-muted-foreground">{selectedFlightData?.duration || "8h 30m"}</p>
                          <p className="text-xs text-accent">Direct</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{selectedFlightData?.arrival || "18:30"}</p>
                          <p className="text-sm font-medium text-muted-foreground">JFK</p>
                          <p className="text-xs text-muted-foreground">New York</p>
                        </div>
                      </div>
                      
                      <div className="text-left sm:text-right">
                        <p className="text-sm text-muted-foreground">Flight {selectedFlightData?.flightNumber || "AC301"}</p>
                        <p className="text-sm text-muted-foreground">{selectedFlightData?.class || "Business"}</p>
                        {selectedSeat && <p className="text-sm text-accent">Seat {selectedSeat}</p>}
                      </div>
                    </div>

                    <Separator className="my-4 bg-border" />

                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Passenger</span>
                        <span className="text-foreground">
                          {passengerInfo.title && `${passengerInfo.title.charAt(0).toUpperCase() + passengerInfo.title.slice(1)} `}
                          {passengerInfo.firstName || "John"} {passengerInfo.lastName || "Doe"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="text-foreground">May 15, 2026</span>
                      </div>
                      {selectedMeal && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Meal</span>
                          <span className="text-foreground">{selectedMealData?.name}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Paid</span>
                        <span className="text-accent font-semibold">£{totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12">
                      <Download className="h-4 w-4 mr-2" />
                      Download E-Ticket
                    </Button>
                    <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-secondary h-12">
                      <Printer className="h-4 w-4 mr-2" />
                      Print Confirmation
                    </Button>
                    <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-secondary h-12">
                      <Bell className="h-4 w-4 mr-2" />
                      Manage Booking
                    </Button>
                  </div>

                  {/* Return Home */}
                  <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-accent hover:underline">
                      <ArrowLeft className="h-4 w-4" />
                      Return to Homepage
                    </Link>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="border-border text-foreground hover:bg-secondary disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={currentStep === 1 && !selectedFlight}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 disabled:opacity-50"
                  >
                    {currentStep === 4 ? "Confirm & Pay" : "Continue"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass rounded-xl p-4 sm:p-6 sticky top-48">
                <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
                
                {/* Destination Image */}
                <div className="relative h-28 rounded-lg overflow-hidden mb-4">
                  <Image
                    src="/images/new-york.jpg"
                    alt="New York"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm font-medium">London → New York</p>
                        <p className="text-white/70 text-xs">Thu, 15 May 2026</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
                        <p className="text-white text-xs font-medium">One Way</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="text-foreground">1 Adult</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Class</span>
                    <span className="text-foreground">{selectedFlightData?.class || "Select flight"}</span>
                  </div>
                  {selectedFlightData && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Flight</span>
                      <span className="text-foreground">{selectedFlightData.flightNumber}</span>
                    </div>
                  )}
                  {selectedSeat && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seat</span>
                      <span className="text-foreground">{selectedSeat}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4 bg-border" />
                
                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Fare</span>
                    <span className="text-foreground">£{basePrice}</span>
                  </div>
                  {seatPrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Seat Selection</span>
                      <span className="text-foreground">£{seatPrice}</span>
                    </div>
                  )}
                  {mealPrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meal Upgrade</span>
                      <span className="text-foreground">£{mealPrice}</span>
                    </div>
                  )}
                  {baggagePrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Extra Baggage</span>
                      <span className="text-foreground">£{baggagePrice}</span>
                    </div>
                  )}
                  {loungePrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lounge Access</span>
                      <span className="text-foreground">£{loungePrice}</span>
                    </div>
                  )}
                  {insurancePrice > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Travel Protection</span>
                      <span className="text-foreground">£{insurancePrice}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="text-foreground">£{taxes}</span>
                  </div>
                </div>

                <Separator className="my-4 bg-border" />
                
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-semibold">Total</span>
                  <span className="text-2xl font-bold text-accent">
                    £{totalPrice}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Free cancellation within 24 hours of booking
                </p>

                {/* Security Badge */}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Secure SSL Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
