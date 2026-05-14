"use client"

import { useState } from "react"
import Link from "next/link"
import { Plane, Facebook, Twitter, Instagram, Youtube, Send, Globe, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  book: [
    { label: "Book a flight", href: "/book" },
    { label: "Manage my booking", href: "#" },
    { label: "Check in online", href: "#" },
    { label: "Flight status", href: "#" },
    { label: "Timetables", href: "#" },
  ],
  information: [
    { label: "Baggage essentials", href: "#" },
    { label: "Travel requirements", href: "#" },
    { label: "Special assistance", href: "#" },
    { label: "Airport guides", href: "#" },
    { label: "Seat maps", href: "#" },
  ],
  executiveClub: [
    { label: "Join Executive Club", href: "#" },
    { label: "Log in", href: "#" },
    { label: "Tier benefits", href: "#" },
    { label: "Avios", href: "#" },
    { label: "Partners", href: "#" },
  ],
  help: [
    { label: "Contact us", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Refunds", href: "#" },
    { label: "Complaints", href: "#" },
    { label: "Feedback", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer id="contact" className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl">
        {/* Newsletter Section */}
        <div className="bg-secondary/30 rounded-lg p-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Get the latest offers</h3>
              <p className="text-muted-foreground">Sign up to receive exclusive deals, travel inspiration and news.</p>
            </div>
            <div className="flex gap-2 max-w-md w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground flex-1"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Plane className="h-5 w-5 text-accent-foreground rotate-[-30deg]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">British Airways</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              To fly. To serve.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Book</h3>
            <ul className="space-y-2">
              {footerLinks.book.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Information</h3>
            <ul className="space-y-2">
              {footerLinks.information.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Executive Club</h3>
            <ul className="space-y-2">
              {footerLinks.executiveClub.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Help</h3>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Terms & conditions</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Cookie policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Accessibility</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Modern slavery statement</Link>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Globe className="h-4 w-4" />
              United Kingdom (English)
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © 2026 British Airways Plc. All rights reserved. British Airways is a registered trademark.
          </p>
        </div>
      </div>
    </footer>
  )
}
