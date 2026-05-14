"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Plane, User, Search, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#home", label: "Book" },
  { href: "#destinations", label: "Destinations" },
  { href: "#business", label: "Business" },
  { href: "/book", label: "Manage" },
  { href: "#deals", label: "Executive Club" },
  { href: "#contact", label: "Help" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-card/95 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-end gap-6 text-xs">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              English (UK)
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Executive Club
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              Log in
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main nav */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Plane className="h-5 w-5 text-accent-foreground rotate-[-30deg]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-foreground">British Airways</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-foreground">
                <Search className="h-5 w-5" />
              </Button>
              <Link href="/book">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6">
                  Book now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-secondary/50 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 px-4">
              <Link href="/book" className="block">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  Book now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
