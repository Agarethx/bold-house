'use client'

import { usePathname } from 'next/navigation'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export function ConditionalLayout({ children }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  return (
    <>
      {!isStudio && <Header />}
      {children}
      {!isStudio && <Footer />}
    </>
  )
}
