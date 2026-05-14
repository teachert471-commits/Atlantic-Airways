"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plane, ArrowLeft, Calendar, Users, CreditCard, User, Mail, Phone, Lock, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const steps = [
  { id: 1, name: "Flight Details", icon: Plane },
  { id: 2, name: "Passenger Info", icon: User },
  { id: 3, name: "Payment", icon: CreditCard },
  { id: 4, name: "Confirmation", icon: Check },
]

const flightOptions = [
  {
    id: "flight-1",
    departure: "08:30",
    arrival: "12:45",
    duration: "8h 15m",
    stops: "Direct",
    price: 899,
    class: "Economy",
  },
  {
    id: "flight-2",
    departure: "14:00",
    arrival: "18:30",
    duration: "8h 30m",
    stops: "Direct",
    price: 1299,
    class: "Business",
  },
  {
    id: "flight-3",
    departure: "21:45",
    arrival: "02:15+1",
    duration: "8h 30m",
    stops: "Direct",
    price: 2499,
    class: "First Class",
  },
]

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    passportNumber: "",
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const selectedFlightData = flightOptions.find((f) => f.id === selectedFlight)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/30 transition-colors" />
                <Plane className="relative h-8 w-8 text-primary rotate-[-30deg]" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold tracking-tight text-foreground">Atlantic Crown</span>
                <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Airways</span>
              </div>
            </Link>
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        currentStep >= step.id
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium hidden sm:block ${
                        currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 sm:w-24 lg:w-32 h-0.5 mx-2 ${
                        currentStep > step.id ? "bg-accent" : "bg-secondary"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form Section */}
            <div className="lg:col-span-2">
              {/* Step 1: Flight Details */}
              {currentStep === 1 && (
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Select Your Flight</h2>
                  <p className="text-muted-foreground mb-6">London (LHR) to New York (JFK) - May 15, 2026</p>
                  
                  <div className="space-y-4">
                    {flightOptions.map((flight) => (
                      <div
                        key={flight.id}
                        onClick={() => setSelectedFlight(flight.id)}
                        className={`p-4 sm:p-6 rounded-xl cursor-pointer transition-all border ${
                          selectedFlight === flight.id
                            ? "border-accent bg-accent/10"
                            : "border-border bg-secondary/30 hover:border-accent/50"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-xl font-semibold text-foreground">{flight.departure}</p>
                              <p className="text-xs text-muted-foreground">LHR</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <p className="text-xs text-muted-foreground mb-1">{flight.duration}</p>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-accent" />
                                <div className="w-16 sm:w-24 h-0.5 bg-border" />
                                <Plane className="h-4 w-4 text-accent" />
                                <div className="w-16 sm:w-24 h-0.5 bg-border" />
                                <div className="w-2 h-2 rounded-full bg-accent" />
                              </div>
                              <p className="text-xs text-accent mt-1">{flight.stops}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xl font-semibold text-foreground">{flight.arrival}</p>
                              <p className="text-xs text-muted-foreground">JFK</p>
                            </div>
                          </div>
                          <div className="text-right sm:text-right">
                            <p className="text-xs text-accent font-medium mb-1">{flight.class}</p>
                            <p className="text-2xl font-bold text-foreground">£{flight.price}</p>
                            <p className="text-xs text-muted-foreground">per person</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Passenger Information */}
              {currentStep === 2 && (
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Passenger Information</h2>
                  <p className="text-muted-foreground mb-6">Please enter the passenger details as shown on the passport</p>
                  
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={passengerInfo.firstName}
                            onChange={(e) => setPassengerInfo({ ...passengerInfo, firstName: e.target.value })}
                            className="pl-10 bg-input border-border text-foreground h-12"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            value={passengerInfo.lastName}
                            onChange={(e) => setPassengerInfo({ ...passengerInfo, lastName: e.target.value })}
                            className="pl-10 bg-input border-border text-foreground h-12"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={passengerInfo.email}
                            onChange={(e) => setPassengerInfo({ ...passengerInfo, email: e.target.value })}
                            className="pl-10 bg-input border-border text-foreground h-12"
                          />
                        </div>
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
                      </div>
                    </div>
                    
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
                        <Label htmlFor="passport" className="text-sm font-medium text-foreground">Passport Number</Label>
                        <Input
                          id="passport"
                          placeholder="AB1234567"
                          value={passengerInfo.passportNumber}
                          onChange={(e) => setPassengerInfo({ ...passengerInfo, passportNumber: e.target.value })}
                          className="bg-input border-border text-foreground h-12"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cabin" className="text-sm font-medium text-foreground">Cabin Class Upgrade</Label>
                      <Select>
                        <SelectTrigger className="bg-input border-border text-foreground h-12">
                          <SelectValue placeholder="Keep current class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy - No change</SelectItem>
                          <SelectItem value="premium">Premium Economy (+£350)</SelectItem>
                          <SelectItem value="business">Business Class (+£850)</SelectItem>
                          <SelectItem value="first">First Class (+£1,600)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Payment Details</h2>
                  <p className="text-muted-foreground mb-6">Your payment is secured with 256-bit SSL encryption</p>
                  
                  <div className="space-y-6">
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
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-sm font-medium text-foreground">Name on Card</Label>
                      <Input
                        id="cardName"
                        placeholder="JOHN DOE"
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                        className="bg-input border-border text-foreground h-12 uppercase"
                      />
                    </div>
                    
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
                        <Label htmlFor="cvv" className="text-sm font-medium text-foreground">CVV</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                            className="pl-10 bg-input border-border text-foreground h-12"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                      <Lock className="h-5 w-5 text-accent" />
                      <p className="text-sm text-muted-foreground">
                        Your payment information is encrypted and secure. We never store your full card details.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="glass rounded-2xl p-6 sm:p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Check className="h-10 w-10 text-accent" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Booking Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your booking reference is <span className="text-accent font-semibold">ACA-2026-78429</span>
                  </p>
                  
                  <div className="glass rounded-xl p-6 mb-6 text-left">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Flight Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Route</span>
                        <span className="text-foreground">London (LHR) → New York (JFK)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="text-foreground">May 15, 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Departure</span>
                        <span className="text-foreground">{selectedFlightData?.departure || "14:00"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Class</span>
                        <span className="text-foreground">{selectedFlightData?.class || "Business"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Passenger</span>
                        <span className="text-foreground">{passengerInfo.firstName} {passengerInfo.lastName || "John Doe"}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    A confirmation email has been sent to {passengerInfo.email || "your email address"}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
                      Download E-Ticket
                    </Button>
                    <Link href="/">
                      <Button variant="outline" className="border-border text-foreground hover:bg-secondary w-full sm:w-auto">
                        Return Home
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-8">
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
                    {currentStep === 3 ? "Confirm & Pay" : "Continue"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass rounded-2xl p-6 sticky top-28">
                <h3 className="text-lg font-semibold text-foreground mb-4">Booking Summary</h3>
                
                <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                  <Image
                    src="/images/new-york.jpg"
                    alt="New York"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white text-sm font-medium">London → New York</p>
                    <p className="text-white/70 text-xs">May 15, 2026</p>
                  </div>
                </div>

                <Separator className="my-4 bg-border" />
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trip Type</span>
                    <span className="text-foreground">One Way</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passengers</span>
                    <span className="text-foreground">1 Adult</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Class</span>
                    <span className="text-foreground">{selectedFlightData?.class || "Select flight"}</span>
                  </div>
                </div>

                <Separator className="my-4 bg-border" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Fare</span>
                    <span className="text-foreground">£{selectedFlightData?.price || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="text-foreground">£{selectedFlightData ? Math.round(selectedFlightData.price * 0.12) : 0}</span>
                  </div>
                </div>

                <Separator className="my-4 bg-border" />
                
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-semibold">Total</span>
                  <span className="text-2xl font-bold text-accent">
                    £{selectedFlightData ? Math.round(selectedFlightData.price * 1.12) : 0}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Free cancellation within 24 hours of booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
