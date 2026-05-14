import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Atlantic Crown Airways | Luxury Flights UK to USA',
  description: 'Experience premium transatlantic travel with Atlantic Crown Airways. Luxury flights from the UK to the USA with unmatched comfort, gourmet dining, and world-class service.',
  keywords: ['luxury airline', 'transatlantic flights', 'UK to USA flights', 'premium travel', 'business class', 'first class'],
}

export const viewport = {
  themeColor: '#0a1628',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
