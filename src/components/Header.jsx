"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getNavigation } from "@/lib/sanity"
import {
  FaBehance,
  FaVimeo,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp
} from "react-icons/fa"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState(null)
  const [navigationData, setNavigationData] = useState({
    menuItems: [],
    socialLinks: []
  })

  useEffect(() => {
    async function fetchNavigation() {
      const nav = await getNavigation()
      setNavigationData(nav)
    }
    fetchNavigation()
  }, [])

  // Fallback menu items if Sanity data is not available
  const menuItems = navigationData.menuItems && navigationData.menuItems.length > 0
    ? navigationData.menuItems
    : [
        { label: "HOME", href: "/", isBold: true, isPink: false, subItems: [] },
        { label: "SKILLS", href: "/servicios", isBold: true, isPink: true, subItems: [
          { label: "AGENCIA CREATIVA", href: "/servicios/agencia-creativa" },
          { label: "AGENCIA DE MARKETING", href: "/servicios/agencia-de-marketing" },
          { label: "AGENCIA DIGITAL", href: "/servicios/agencia-digital" },
          { label: "AGENCIA DE REDES SOCIALES", href: "/servicios/agencia-de-redes-sociales" },
          { label: "AGENCIA INFLUENCERS", href: "/servicios/agencia-influencers" },
          { label: "AGENCIA ECOMMERCE", href: "/servicios/agencia-ecommerce" },
          { label: "BOLD FILMS", href: "/servicios/bold-films" },
          { label: "BOLD BTL", href: "/servicios/bold-btl" },
          { label: "MOTION GRAPHICS & 3D", href: "/servicios/motion-graphics-3d" },
        ] },
        { label: "PORTAFOLIO", href: "/portafolio", isBold: false, isPink: false, subItems: [] },
        { label: "CLIENTES", href: "/clientes", isBold: true, isPink: false, subItems: [] },
        { label: "BLOG", href: "/blog", isBold: false, isPink: false, subItems: [] },
        { label: "CONTACTO", href: "/contacto", isBold: true, isPink: false, subItems: [] },
      ]

  const socialLinks = navigationData.socialLinks && navigationData.socialLinks.length > 0
    ? navigationData.socialLinks
    : [
        { platform: "behance", url: "#", order: 0 },
        { platform: "vimeo", url: "#", order: 1 },
        { platform: "instagram", url: "#", order: 2 },
        { platform: "linkedin", url: "#", order: 3 },
        { platform: "whatsapp", url: "#", order: 4 },
      ]

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "behance":
        return <FaBehance className="w-6 h-6" />
      case "vimeo":
        return <FaVimeo className="w-6 h-6" />
      case "instagram":
        return <FaInstagram className="w-6 h-6" />
      case "linkedin":
        return <FaLinkedin className="w-6 h-6" />
      case "whatsapp":
        return <FaWhatsapp className="w-6 h-6" />
      default:
        return null
    }
  }

  const toggleSubMenu = (index) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <h1 className="text-4xl font-boldstrom text-[#201b25]">BOLDHOUSE</h1>
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
              className="lg:hidden text-[#1a1a2e] hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Abrir menú">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                className="w-8 h-8 text-[#1a1a2e]"
                aria-hidden
              >
                <circle cx="100" cy="100" r="100" fill="#FF2E8D" />
                <g style={{ display: "none" }}>
                  <path
                    fill="white"
                    d="M131.4,86.6l-35.7,12.4,35.7,15v26.2l-65.2-29.8v-22.7l65.2-29.8v28.7Z"
                  />
                </g>
                <g
                  fill="none"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16.3"
                >
                  <path d="M158.3,104h0c-2.5,0-4.6-2.1-4.6-4.6h0c0-2.5,2.1-4.6,4.6-4.6h0c2.5,0,4.6,2.1,4.6,4.6h0c0,2.5-2.1,4.6-4.6,4.6Z" />
                  <path d="M41.7,104h0c-2.5,0-4.6-2.1-4.6-4.6h0c0-2.5,2.1-4.6,4.6-4.6h0c2.5,0,4.6,2.1,4.6,4.6h0c0,2.5-2.1,4.6-4.6,4.6Z" />
                  <path d="M100,105.2h0c-2.5,0-4.6-2.1-4.6-4.6h0c0-2.5,2.1-4.6,4.6-4.6h0c2.5,0,4.6,2.1,4.6,4.6h0c0,2.5-2.1,4.6-4.6,4.6Z" />
                </g>
              </svg>
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
        className={`fixed top-0 left-0 h-full w-full bg-[#242129] z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6">
            <Image
              src="/header_logo.png"
              alt="BOLDHOUSE"
              width={200}
              height={40}
              className="h-8 md:h-10 w-auto invert brightness-0 invert"
              priority
            />

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#FF2E8D] hover:text-[#ff5aa8] transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-8 h-8" strokeWidth={3} />
            </button>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex-1 overflow-y-auto py-8 px-6">
            <ul className="">
              {menuItems.map((item, index) => (
                <li key={item.href || index}>
                  <div>
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.subItems && item.subItems.length > 0) {
                          e.preventDefault()
                          toggleSubMenu(index)
                        } else {
                          setIsOpen(false)
                        }
                      }}
                      className={`block py-3 px-2 uppercase tracking-wider transition-colors font-boldstrom text-[36px] ${
                        item.isPink
                          ? "text-[#FF2E8D] font-bold"
                          : item.isBold
                            ? "text-white font-bold"
                            : "text-white font-normal"
                      } hover:text-[#FF2E8D]`}
                    >
                      <span className="text-[#FF2E8D] mr-2">{">"}</span>
                      {item.label}
                    </Link>

                    {/* Sub Menu Items */}
                    {item.subItems && item.subItems.length > 0 && expandedItem === index && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subItem.href || subIndex}>
                            <Link
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className="block py-2 px-2 text-white uppercase tracking-wider font-bold hover:text-[#FF2E8D] transition-colors"
                            >
                              <span className="text-[#FF2E8D] mr-2">{">"}</span>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>

          {/* Drawer Footer */}
          <div className="p-6 space-y-6">
            {/* Social Media Icons */}
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#FF2E8D] hover:text-white transition-colors"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>

            {/* Be Bold Logo/Signature */}
            <div className="text-center">
              <p className="text-white text-sm font-boldstrom font-normal italic">
                Be bold
              </p>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-white/60 text-xs uppercase tracking-wide">
                © COPYRIGHT 2026, ALL RIGHTS RESERVED BY BOLD HOUSE
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
