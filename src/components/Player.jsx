"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { SkipBack, Maximize2, Activity } from "lucide-react"
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

const VIDEO_EXPAND_DURATION = 500
const BG_FADE_DURATION = 600
const BG_EXIT_DURATION = 1000
const VIDEO_RETURN_DURATION = 300

function getFallbackOriginRect() {
  if (typeof window === "undefined") return { top: 0, left: 0, width: 400, height: 225 }
  const w = window.innerWidth
  const h = window.innerHeight
  const size = Math.min(w * 0.8, h * 0.6, 800)
  return {
    top: (h - size * 9 / 16) / 2,
    left: (w - size) / 2,
    width: size,
    height: size * 9 / 16,
  }
}

function getExpandedRect() {
  if (typeof window === "undefined") return { top: 0, left: 0, width: 400, height: 225 }
  const w = window.innerWidth
  const h = window.innerHeight
  const width = Math.min(w, h * 16 / 9)
  const height = Math.min(h, w * 9 / 16)
  return {
    top: (h - height) / 2,
    left: (w - width) / 2,
    width,
    height,
  }
}

export function Player({ video, isOpen, onClose, imageSecondary, originRect, initialTime }) {
  const rect = originRect || getFallbackOriginRect()
  const videoRef = useRef(null)
  const [videoExpanded, setVideoExpanded] = useState(false)
  const [bgVisible, setBgVisible] = useState(false)
  const [phase, setPhase] = useState("expanding") // expanding | ready | backgroundExiting | videoReturning

  // Opening: video expands, then background fades in
  useEffect(() => {
    if (!isOpen || !originRect) return

    setVideoExpanded(false)
    setBgVisible(false)
    setPhase("expanding")

    // Trigger expand after initial paint
    const expandTimer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVideoExpanded(true)
      })
    })

    // After video expands, show background
    const bgTimer = setTimeout(() => {
      setBgVisible(true)
      setPhase("ready")
    }, VIDEO_EXPAND_DURATION)

    return () => {
      cancelAnimationFrame(expandTimer)
      clearTimeout(bgTimer)
    }
  }, [isOpen, originRect])

  const handleClose = () => {
    if (phase === "backgroundExiting" || phase === "videoReturning") return
    setPhase("backgroundExiting")
    setBgVisible(false)

    // Mute and remove volume immediately when closing
    const videoEl = videoRef.current
    if (videoEl) {
      videoEl.muted = true
      videoEl.volume = 0
    }

    // After bg fades, return video to origin
    setTimeout(() => {
      setPhase("videoReturning")
      setVideoExpanded(false)
      // Pause video (already muted from handleClose start)
      const videoEl = videoRef.current
      if (videoEl) {
        videoEl.pause()
      }

      setTimeout(() => {
        const currentTime = videoEl?.currentTime ?? 0
        onClose(currentTime)
      }, VIDEO_RETURN_DURATION)
    }, BG_EXIT_DURATION)
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Get video URL based on type (embed URLs can include start time)
  const getVideoUrl = (startTime) => {
    if (!video) return null
    switch (video.videoType) {
      case "file":
        return video.videoFile?.asset?.url || null
      case "youtube": {
        const videoId = getYouTubeId(video.videoUrl)
        if (!videoId) return null
        const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`
        return startTime > 0 ? `${url}&start=${Math.floor(startTime)}` : url
      }
      case "vimeo": {
        const videoId = getVimeoId(video.videoUrl)
        if (!videoId) return null
        const base = `https://player.vimeo.com/video/${videoId}?autoplay=1&playsinline=1`
        return startTime > 0 ? `${base}#t=${Math.floor(startTime)}s` : base
      }
      case "url":
        return video.videoUrl || null
      default:
        return null
    }
  }

  const isEmbedVideo = video?.videoType === "youtube" || video?.videoType === "vimeo"
  const embedStartTime = typeof initialTime === "number" ? initialTime : 0
  const videoUrl = getVideoUrl(isEmbedVideo ? embedStartTime : 0)

  // If used as popup (isOpen prop provided), render as fullscreen modal
  if (isOpen) {
    const expandedRect = getExpandedRect()
    const videoStyle = videoExpanded
      ? {
          top: expandedRect.top,
          left: expandedRect.left,
          width: expandedRect.width,
          height: expandedRect.height,
          transition: `top ${VIDEO_EXPAND_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), left ${VIDEO_EXPAND_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), width ${VIDEO_EXPAND_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), height ${VIDEO_EXPAND_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }
      : {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          transition: `top ${VIDEO_RETURN_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), left ${VIDEO_RETURN_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), width ${VIDEO_RETURN_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1), height ${VIDEO_RETURN_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }

    return (
      <>
        {/* Video layer - fixed, animates from origin to fullscreen and back */}
        <div
          className={`fixed z-60 overflow-hidden transition-[border-radius] duration-500 ${!videoExpanded ? "rounded-2xl" : "rounded-none"}`}
          style={{
            ...videoStyle,
            pointerEvents: phase === "videoReturning" ? "none" : "auto",
          }}
          onClick={(e) => phase === "ready" && e.stopPropagation()}
        >
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
            {videoUrl && isEmbedVideo ? (
              <iframe
                src={videoUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video"
              />
            ) : videoUrl && (video?.videoType === "file" || video?.videoType === "url") ? (
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
                loop
                muted
                playsInline
                onLoadedMetadata={(e) => {
                  if (typeof initialTime === "number" && initialTime > 0) {
                    e.target.currentTime = initialTime
                  }
                }}
                onPlay={(e) => {
                  const v = e.target
                  v.muted = false
                  v.volume = 1
                }}
              >
                Your browser does not support the video tag.
              </video>
            ) : imageSecondary ? (
              <Image
                src={imageSecondary}
                alt={video?.title || "Video"}
                fill
                className="object-contain"
              />
            ) : null}
          </div>
        </div>

        {/* Background layer - grows from center (up/down) when entering, shrinks when closing */}
        <div
          className={`fixed inset-0 z-50 bg-[#242129] origin-center ${
            bgVisible ? "" : "pointer-events-none"
          }`}
          style={{
            transform: bgVisible ? "scaleY(1)" : "scaleY(0)",
            transition: `transform ${phase === "backgroundExiting" ? BG_EXIT_DURATION : BG_FADE_DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
          onClick={handleClose}
        />

        {/* Player Controls + Close - visible when background is visible */}
        {bgVisible && (
          <>
            <div
              className="fixed z-70 flex items-center justify-between px-4"
              style={{
                top: expandedRect.top + expandedRect.height + 16,
                left: expandedRect.left,
                width: expandedRect.width,
              }}
            >
              <div>
                <h3 className="text-white font-bold text-lg">{video?.title || 'NIKE'}</h3>
                <p className="text-white/70 font-light">{video?.subtitle || 'LEGADO AIR MAX'}</p>
              </div>
            </div>
            <button
            onClick={(e) => {
              e.stopPropagation()
              handleClose()
            }}
            className="fixed top-4 right-4 md:top-12 md:right-12 z-70 cursor-pointer hover:opacity-80 transition-opacity"
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
          </>
        )}
      </>
    )
  }

  // Default behavior - render as section (for banner/hero use)
  return (
    <section className="bg-[#242129] py-16 md:py-24 overflow-hidden relative">
      <div className="container mx-auto">
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
