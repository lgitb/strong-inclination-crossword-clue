import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Strong Inclination Crossword Clue',
  description: 'Find crossword clues for any word',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen">{children}</body>
    </html>
  )
}
