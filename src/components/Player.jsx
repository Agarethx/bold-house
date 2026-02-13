"use client"

import { useEffect } from "react"
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

export function Player({ video, isOpen, onClose }) {
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
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col bg-[#242129]"
        onClick={onClose}
      >
        <div
          className="relative flex-1 flex flex-col min-h-0 w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Player Content - Fullscreen */}
          <section className="flex-1 flex flex-col pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden relative min-h-0 items-center justify-center">
      <div className="container mx-auto px-0">
        {/* Circular Badge - Top Right - Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 md:top-12 md:right-12 z-20 cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Cerrar video"
        >
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
        </button>

        {/* Animated Background Text */}
        <div className="relative w-full -top-7">
          {/* Top text - moves right */}
          <div className="overflow-hidden whitespace-nowrap mb-0">
            <div className="animate-marquee-right inline-block">
              <span className="text-white text-7xl md:text-8xl lg:text-9xl font-boldstrom">
                {"> BOLD HOUSE > BOLD HOUSE > BOLD HOUSE > BOLD HOUSE > BOLD HOUSE "}
              </span>
            </div>
          </div>

          {/* Bottom text - moves left */}
          <div className="overflow-hidden whitespace-nowrap relative -top-3">
            <div className="animate-marquee-left inline-block">
              <span
                className="text-7xl md:text-8xl lg:text-9xl text-white font-boldstrom">
                {"BRAVE> BE BRAVE> BE BRAVE> BE BRAVE> BE BRAVE> BE BRAVE> BE "}
              </span>
            </div>
          </div>
        </div>

          {/* Video Container - fills viewport, true fullscreen */}
          <div className="relative z-10 flex-1 flex items-center justify-center min-h-0 -mt-16 md:-mt-24">
            <div className="relative w-full h-full min-h-0 flex items-center justify-center px-4">
              <div className="relative w-full max-w-[90vw] aspect-video rounded-2xl overflow-hidden">
              {videoUrl && isEmbedVideo ? (
                <iframe
                  src={`${videoUrl}?autoplay=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video"
                />
              ) : videoUrl && video?.videoType === 'file' ? (
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
              ) : videoUrl && video?.videoType === 'url' ? (
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
                  src={thumbnailUrl}
                  alt="Nike Legado Air Max Campaign"
                  fill
                  className="object-cover"
                />
              )}
              {/* Video overlay text */}
              <div className="absolute inset-0 bg-black/20 hidden px-4">
                <span className="text-white/80 text-sm tracking-widest uppercase mb-1">Legado</span>
                <span className="text-white text-2xl md:text-3xl font-bold tracking-wide">AIR MAX</span>
                <span className="text-white/60 text-xs tracking-wider mt-1">CONTRATO DE HERENCIA</span>
              </div>
              </div>
            </div>
          </div>

        {/* Player Controls */}
        <div className="mt-8 flex items-center justify-between max-w-3xl mx-auto px-4">
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
