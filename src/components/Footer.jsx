import Link from "next/link"
import Image from "next/image"
import { Linkedin, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  const services = [
    "AGENCIA CREATIVA",
    "AGENCIA DE MARKETING",
    "AGENCIA DIIGITAL",
    "AGENCIA DE REDES SOCIALES",
    "AGENCIA INFLUENCERS",
    "AGENCIA ECOMMERCE",
    "BOLD FILMS",
    "BOLD BTL",
    "MOTION GRAPHICS & 3D",
  ]

  const socialLinks = [
    {
      name: "Behance",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20.07 6.35H15v1.55h5.09zM22 9.83c0-3.91-2.13-6.83-6-6.83-3.56 0-6.25 2.65-6.25 6.83s2.69 7.17 6.53 7.17a6.43 6.43 0 005.59-3.21l-2.43-1.42a3.55 3.55 0 01-3.16 1.85c-1.94 0-3.24-1.26-3.44-3.12h9.12c.02-.24.04-.9.04-1.27zm-9.2-1.55a3.05 3.05 0 013-2.83c1.42 0 2.67 1 2.85 2.83zM7.5 20a7.5 7.5 0 110-15 7.5 7.5 0 010 15zm-1.86-5.56V9.14H3.93v5.3c0 1.11.29 1.97.88 2.58a3.2 3.2 0 002.29.84 3.2 3.2 0 002.29-.84c.59-.61.88-1.47.88-2.58V9.14H8.56v5.3c0 .47-.11.85-.34 1.14a1.18 1.18 0 01-.94.43 1.18 1.18 0 01-.94-.43c-.23-.29-.34-.67-.34-1.14z" />
        </svg>
      ),
    },
    {
      name: "Vimeo",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 003.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797z" />
        </svg>
      ),
    },
    { name: "Instagram", icon: <Instagram className="w-6 h-6" /> },
    { name: "LinkedIn", icon: <Linkedin className="w-6 h-6" /> },
    { name: "WhatsApp", icon: <MessageCircle className="w-6 h-6" /> },
  ]

  return (
    <footer className="bg-[#242129] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Logo Principal */}
        <div className="mb-10">
          <Image src="/img/header_logo.png" alt="BOLD" width={400} height={120} className="w-auto h-40" />
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 mb-12">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href="#"
              className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition-colors"
              aria-label={social.name}
            >
              {social.icon}
            </Link>
          ))}
        </div>

        {/* Services List */}
        <nav className="mb-12">
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service}>
                <Link href="#" className="text-lg font-semibold hover:text-gray-300 transition-colors tracking-wide">
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <a
          href="mailto:contacto@boldhouse.cl"
          className="mb-12 bg-transparent border-white text-white hover:bg-white hover:text-black rounded-full px-12 py-6 text-lg font-medium"
        >
          HABLEMOS
        </a>

        {/* Contact Info */}
        <div className="mb-12 space-y-2">
          <p className="text-xl font-semibold">+569 796 90 794</p>
          <p className="text-lg">CONTACTO@BOLDHOUSE.CL</p>
        </div>

        {/* Bottom Logo */}
        <div className="mb-8">
          <Image src="/be-bold-logo-pink.jpg" alt="Be Bold" width={200} height={80} className="w-auto h-16" />
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">© COPYRIGHT 2026, ALL RIGHTS RESERVED BY BOLD HOUSE</p>
      </div>
    </footer>
  )
}
