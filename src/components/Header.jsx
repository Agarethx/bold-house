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
        {/* Full width header with logo and menu button */}
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className=" border border-gray-300 rounded-full flex justify-between w-full px-4 items-center">
            {/* Logo - White pill container */}
            <Link href="/" className="shrink-0">
              <div className=" px-4 md:px-6 py-2 md:py-3 flex items-center">
                <h1 className="text-2xl md:text-2xl font-boldstrom text-[#201b25] uppercase">BOLDHOUSE</h1>
              </div>
            </Link>

            {/* Menu Button - Magenta circular button with ellipsis (visible on mobile and desktop) */}
            <button
              onClick={() => setIsOpen(true)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF2E8D] flex items-center justify-center hover:bg-[#ff5aa8] transition-colors shrink-0"
              aria-label="Abrir menú">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="5" cy="12" r="1" />
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
              </svg>
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-[#242129] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 md:p-6">
            {/* Logo with integrated X button - White pill container */}
            <div className="bg-white border border-gray-300 rounded-full px-4 md:px-6 py-2 md:py-3 flex items-center gap-3 md:gap-4 w-full justify-between">
              <h1 className="text-2xl md:text-2xl font-boldstrom text-[#201b25] uppercase">BOLDHOUSE</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#FF2E8D] hover:text-[#ff5aa8] transition-colors shrink-0"
                aria-label="Cerrar menú"
              >
                <X className="w-8 h-8 md:w-6 md:h-6" strokeWidth={3} />
              </button>
            </div>
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
                      className={`block px-2 uppercase tracking-wider transition-colors font-boldstrom text-[36px] ${
                        item.isPink
                          ? "text-[#FF2E8D] font-bold"
                          : item.isBold
                            ? "text-white font-bold"
                            : "text-white font-normal"
                      } hover:text-[#FF2E8D]`}
                    >
                      <span className="text-white mr-2">{">"}</span>
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
