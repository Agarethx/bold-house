"use client"

import { useState, useEffect } from "react"

export function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const scrollableHeight = scrollHeight - clientHeight

      if (scrollableHeight <= 0) {
        setScrollProgress(1)
      } else {
        setScrollProgress(scrollTop / scrollableHeight)
      }

      // Mostrar botón después de scrollear un poco
      setIsVisible(scrollTop > 200)
    }

    handleScroll() // Estado inicial
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const size = 48
  const strokeWidth = 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - scrollProgress)

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Ir al inicio de la página"
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
      >
        {/* Círculo base (gris claro) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth={strokeWidth}
        />
        {/* Círculo de progreso (negro) - empieza desde arriba, llena en sentido horario */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-[stroke-dashoffset] duration-100"
        />
        {/* Chevron hacia arriba - centrado en el círculo (24,24) */}
        <path
          d="M14 27 L24 19 L34 27"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
