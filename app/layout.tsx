import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'British Airways | Flights & Holidays',
  description: 'Book flights online with British Airways. Find cheap airfares, last minute deals and seat sales. Explore destinations, check-in online and manage your booking.',
  keywords: ['British Airways', 'flights', 'UK flights', 'transatlantic', 'airline', 'travel', 'holidays'],
}

export const viewport = {
  themeColor: '#0a1833',
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
