"use client"

import Image from "next/image"
import { SkipBack, Maximize2, Activity } from "lucide-react"

export function Player() {
  return (
    <section className="bg-[#242129] py-16 md:py-24 overflow-hidden relative">
      <div className="container mx-auto px-4">
        {/* Circular Badge - Top Right */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20">
          <div className="relative w-24 h-24 md:w-28 md:h-28">
            {/* Rotating text */}
            <svg
              className="w-full h-full animate-spin-slow"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[9px] uppercase tracking-[0.3em] fill-white font-bold">
                <textPath href="#circlePath">
                  BEBOLD • BELEADERS • BEBRAVE •
                </textPath>
              </text>
            </svg>
            {/* Center X icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-3xl md:text-4xl font-bold">X</span>
            </div>
          </div>
        </div>

        {/* Animated Background Text */}
        <div className="relative">
          {/* Top text - moves right */}
          <div className="overflow-hidden whitespace-nowrap mb-2">
            <div className="animate-marquee-right inline-block">
              <span className="text-white text-6xl md:text-8xl lg:text-9xl font-black italic">
                {"> BOLD HOUSE > BOLD HOUSE > BOLD HOUSE > BOLD HOUSE > BOLD HOUSE "}
              </span>
            </div>
          </div>

          {/* Bottom text - moves left */}
          <div className="overflow-hidden whitespace-nowrap">
            <div className="animate-marquee-left inline-block">
              <span
                className="text-6xl md:text-8xl lg:text-9xl font-black italic"
                style={{
                  WebkitTextStroke: "2px rgba(255,255,255,0.3)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {"BRAVE> BE BRAVE> BE BRAVE> BE BRAVE> BE BRAVE> BE BRAVE> BE "}
              </span>
            </div>
          </div>

          {/* Video Container - overlapping the text */}
          <div className="relative z-10 -mt-20 md:-mt-32 lg:-mt-40 max-w-3xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src="/player-thumbnail.jpg"
                alt="Nike Legado Air Max Campaign"
                fill
                className="object-cover"
              />
              {/* Video overlay text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
                <span className="text-white/80 text-sm tracking-widest uppercase mb-1">Legado</span>
                <span className="text-white text-2xl md:text-3xl font-bold tracking-wide">AIR MAX</span>
                <span className="text-white/60 text-xs tracking-wider mt-1">CONTRATO DE HERENCIA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Player Controls */}
        <div className="mt-8 flex items-center justify-between max-w-3xl mx-auto">
          {/* Project Info */}
          <div>
            <h3 className="text-white font-bold text-lg">NIKE</h3>
            <p className="text-white/70 font-light">LEGADO AIR MAX</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Play/Back button */}
            <button
              type="button"
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Anterior"
            >
              <SkipBack className="w-5 h-5 text-white" fill="white" />
            </button>

            {/* Waveform icon */}
            <button
              type="button"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Audio"
            >
              <Activity className="w-6 h-6" />
            </button>

            {/* Fullscreen icon */}
            <button
              type="button"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Pantalla completa"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
