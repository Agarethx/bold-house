"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: "Inicio", href: "/" },
    { label: "Skills", href: "/servicios" },
    { label: "Portfolio", href: "/portfolio" },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/header_logo.png"
                alt="BOLDHOUSE"
                width={200}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {menuItems.slice(0, 5).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-[#1a1a2e] hover:text-gray-600 transition-colors tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] rounded-full px-6">
                HABLEMOS
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 text-[#1a1a2e] hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-8 h-8" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-[#1a1a2e] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Image
              src="/header_logo.png"
              alt="BOLDHOUSE"
              width={150}
              height={30}
              className="h-8 w-auto invert brightness-0 invert"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 px-4">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 text-white font-semibold hover:bg-white/10 rounded-lg transition-colors tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-white/10">
            <Button
              className="w-full bg-white text-[#1a1a2e] hover:bg-gray-100 rounded-full py-6 text-lg font-semibold"
              onClick={() => setIsOpen(false)}
            >
              HABLEMOS
            </Button>
            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">+569 796 90 794</p>
              <p className="text-white/60 text-xs mt-1">CONTACTO@BOLDHOUSE.CL</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
