import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
})

export const metadata = {
  title: 'ResumeAI — Land Your Dream Job 10x Faster',
  description: 'The AI-powered resume builder that gets you hired. 100% ATS-approved. Used by 10,000+ professionals.',
}

export default function RootLayout({ children }: { children: React.ReactNode })  {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}