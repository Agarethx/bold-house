"use client"

import Image from "next/image"

export function Reel() {
  const scrollToForm = () => {
    const formElement = document.getElementById("contacto")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Top text */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-5xl font-black italic leading-tight text-[#1a1a1a]">
            CREAMOS IDEAS
            <br />
            QUE NOS
            <br />
            MUEVEN
          </h2>
          <p
            className="text-3xl md:text-5xl font-black italic leading-tight mt-2"
            style={{
              WebkitTextStroke: "1.5px #1a1a1a",
              WebkitTextFillColor: "transparent",
            }}
          >
            SIN DEJAR —
            <br />
            NADA AL AZAR.
          </p>
        </div>

        {/* Video/Image thumbnail */}
        <div className="relative w-full aspect-[3/4] md:aspect-video max-w-md mx-auto mb-12 rounded-2xl overflow-hidden">
          <Image
            src="/reel-thumbnail.jpg"
            alt="Reel video thumbnail"
            fill
            className="object-cover"
          />
          {/* Overlay text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-5xl md:text-7xl font-black italic text-white/90"
              style={{
                textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              LEAVING
            </span>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mb-10">
          <h3 className="text-2xl md:text-4xl font-black italic leading-tight text-[#1a1a1a]">
            CONVIÉRTETE
            <br />
            EN UNA MARCA
            <br />
            MEMORABLE.
          </h3>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToForm}
            className="bg-[#E91E8C] hover:bg-[#d11a7d] text-white font-bold text-sm tracking-wider px-10 py-4 rounded-full transition-colors"
          >
            AGENDAR REUNIÓN
          </button>
        </div>
      </div>
    </section>
  )
}
