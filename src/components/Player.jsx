"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { SkipBack, Maximize2, Activity, X } from "lucide-react"
import { urlFor } from "../../sanity/lib/image"

// Helper function to extract YouTube video ID
function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url?.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

// Helper function to extract Vimeo video ID
function getVimeoId(url) {
  const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i
  const match = url?.match(regExp)
  return match ? match[1] : null
}

const EXIT_DURATION = 700

export function Player({ video, isOpen, onClose, imageSecondary }) {
  const [animationPhase, setAnimationPhase] = useState("entering")

  // Reset and run entrance animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setAnimationPhase("entering")
      const timer = setTimeout(() => setAnimationPhase("complete"), EXIT_DURATION)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleClose = () => {
    if (animationPhase === "exiting") return
    setAnimationPhase("exiting")
    setTimeout(() => onClose(), EXIT_DURATION)
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Get video URL based on type
  const getVideoUrl = () => {
    if (!video) return null

    switch (video.videoType) {
      case 'file':
        return video.videoFile?.asset?.url || null
      case 'youtube': {
        const videoId = getYouTubeId(video.videoUrl)
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
      }
      case 'vimeo': {
        const videoId = getVimeoId(video.videoUrl)
        return videoId ? `https://player.vimeo.com/video/${videoId}` : null
      }
      case 'url':
        return video.videoUrl || null
      default:
        return null
    }
  }

  const videoUrl = getVideoUrl()
  const isEmbedVideo = video?.videoType === 'youtube' || video?.videoType === 'vimeo'
  const thumbnailUrl = video?.thumbnail
    ? urlFor(video.thumbnail).width(1200).height(800).url()
    : "/player-thumbnail.jpg"

  // If used as popup (isOpen prop provided), render as fullscreen modal
  if (isOpen) {
    const isEntering = animationPhase === "entering"
    const isExiting = animationPhase === "exiting"
    const showChrome = animationPhase === "complete" // marquee y controles visibles
    return (
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-[#242129] transition-opacity duration-700 ${
          isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
        } ${isExiting ? "overflow-visible" : "overflow-hidden"}`}
        onClick={handleClose}
      >
        {/* Close Button - siempre visible */}
        <button
          onClick={handleClose}
          className="fixed top-1 right-1 md:top-12 md:right-12 z-40 cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Cerrar video"
        >
          <div className="relative w-24 h-24 md:w-28 md:h-28">
            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <defs>
                <path id="circlePath-modal" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text className="text-[9px] uppercase tracking-[0.3em] fill-white font-bold">
                <textPath href="#circlePath-modal">BEBOLD • BELEADERS • BEBRAVE •</textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-3xl md:text-4xl font-bold">X</span>
            </div>
          </div>
        </button>

        {/* Layout único: video anima en su posición final, sin saltos */}
        <div
          className={`flex flex-1 flex-col min-h-0 ${isExiting ? "overflow-visible" : "overflow-y-auto"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-1 flex-col items-center justify-center px-0 py-20 md:py-24">
            <div className="relative w-full max-w-3xl">
              <div className="relative -top-12">
                {/* Marquee arriba - BOLD HOUSE - fade in después del video */}
                <div
                  className={`overflow-hidden whitespace-nowrap mb-0 transition-opacity duration-500 ${showChrome ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="animate-marquee-right inline-block">
                    <span className="text-white text-6xl md:text-8xl lg:text-9xl font-boldstrom">
                      {"> BOLD HOUSE > BOLD HOUSE > BOLD HOUSE > BOLD HOUSE > BOLD HOUSE "}
                    </span>
                  </div>
                </div>

                {/* Marquee abajo - BRAVE - fade in después del video */}
                <div
                  className={`overflow-hidden whitespace-nowrap relative -top-3 transition-opacity duration-500 ${showChrome ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="animate-marquee-left inline-block">
                    <span
                      className="text-7xl md:text-8xl lg:text-9xl text-white font-boldstrom">
                      {"BRAVE> BE BRAVE> BE BRAVE> BE BRAVE> BE BRAVE> BE BRAVE> BE "}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video - posición fija, solo escala (sin saltos) */}
              <div
                className={`relative z-10 -mt-20 md:-mt-32 max-w-3xl mx-auto px-4 ${isEntering ? "animate-player-video-expand" : isExiting ? "animate-player-video-shrink" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  {videoUrl && isEmbedVideo ? (
                    <iframe
                      src={`${videoUrl}?autoplay=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Video"
                    />
                  ) : videoUrl && (video?.videoType === 'file' || video?.videoType === 'url') ? (
                    <video
                      src={videoUrl}
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      loop
                      muted
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Image
                      src={imageSecondary}
                      alt={video?.title || "Video"}
                      fill
                      className="object-cover"
                    />
                  )}
                  {/* Overlay LEGADO AIR MAX sobre el video */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 pointer-events-none">
                    <span className="text-white/80 text-sm tracking-widest uppercase mb-1">Legado</span>
                    <span className="text-white text-2xl md:text-3xl font-bold tracking-wide">AIR MAX</span>
                    <span className="text-white/60 text-xs tracking-wider mt-1">CONTRATO DE HERENCIA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles y título - debajo del video, fade in */}
            <div
              className={`mt-8 flex items-center justify-between w-full max-w-3xl mx-auto transition-opacity duration-500 px-4 ${showChrome ? "opacity-100" : "opacity-0"}`}
            >
              <div>
                <h3 className="text-white font-bold text-lg">{video?.title || 'NIKE'}</h3>
                <p className="text-white/70 font-light">{video?.subtitle || 'LEGADO AIR MAX'}</p>
              </div>
              <div className="flex items-center gap-4">
                <button type="button" className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white/10 transition-colors" aria-label="Anterior">
                  <SkipBack className="w-5 h-5 text-white" fill="white" />
                </button>
                <button type="button" className="text-white hover:text-white/80 transition-colors" aria-label="Audio">
                  <Activity className="w-6 h-6" />
                </button>
                <button type="button" className="text-white hover:text-white/80 transition-colors" aria-label="Pantalla completa">
                  <Maximize2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default behavior - render as section (for banner/hero use)
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
                src={imageSecondary}
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
            <h3 className="text-white font-bold text-lg">{video?.title || 'NIKE'}</h3>
            <p className="text-white/70 font-light">{video?.subtitle || 'LEGADO AIR MAX'}</p>
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
