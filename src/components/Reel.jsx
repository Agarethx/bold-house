"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Volume2, VolumeX } from "lucide-react"
import { getReelVideo } from "@/lib/sanity"
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

export function Reel() {
  const [videos, setVideos] = useState({ mobile: null, desktop: null })
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const mobileVideoRef = useRef(null)
  const desktopVideoRef = useRef(null)
  const mobileYtPlayerRef = useRef(null)
  const desktopYtPlayerRef = useRef(null)

  const toggleMute = () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)

    // Native video (file/url)
    ;[mobileVideoRef.current, desktopVideoRef.current].forEach((el) => {
      if (el) {
        el.muted = newMuted
      }
    })

    // YouTube embeds
    ;[mobileYtPlayerRef.current, desktopYtPlayerRef.current].forEach((player) => {
      if (player?.mute) {
        newMuted ? player.mute() : player.unMute()
      }
    })
  }

  useEffect(() => {
    async function fetchVideo() {
      try {
        const data = await getReelVideo()
        setVideos(data)
      } catch (error) {
        console.error('Error fetching reel video:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideo()
  }, [])

  const scrollToForm = () => {
    const formElement = document.getElementById("contacto")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Hardcoded texts
  const topTextLine1 = "CREAMOS IDEAS"
  const topTextLine2 = "QUE NOS"
  const topTextLine3 = "MUEVEN"
  const pinkTextLine1 = "SIN DEJAR —"
  const pinkTextLine2 = "NADA AL AZAR."
  const overlayText = "LEAVING"
  const bottomTextLine1 = "CONVIÉRTETE"
  const bottomTextLine2 = "EN UNA MARCA"
  const bottomTextLine3 = "MEMORABLE."
  const ctaButtonText = "AGENDAR REUNIÓN"

  // Get video URL and metadata for a video object
  const getVideoInfo = (video) => {
    if (!video) return { url: null, isEmbed: false, thumbnailUrl: "/reel-thumbnail.jpg" }
    const thumbnailUrl = video.thumbnail
      ? urlFor(video.thumbnail).width(1200).height(800).url()
      : "/reel-thumbnail.jpg"
    let url = null
    switch (video.videoType) {
      case 'file':
        url = video.videoFile?.asset?.url || null
        break
      case 'youtube': {
        const videoId = getYouTubeId(video.videoUrl)
        url = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&enablejsapi=1` : null
        break
      }
      case 'vimeo': {
        const videoId = getVimeoId(video.videoUrl)
        url = videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1` : null
        break
      }
      case 'url':
        url = video.videoUrl || null
        break
      default:
        break
    }
    const isEmbed = video.videoType === 'youtube' || video.videoType === 'vimeo'
    return { url, isEmbed, thumbnailUrl }
  }

  const mobileVideo = videos.mobile
  const desktopVideo = videos.desktop || videos.mobile
  const mobileInfo = getVideoInfo(mobileVideo)
  const desktopInfo = getVideoInfo(desktopVideo)

  // Load YouTube API and create players for embeds
  useEffect(() => {
    if (isLoading || (!mobileInfo.isEmbed && !desktopInfo.isEmbed)) return

    const loadYtApi = () => {
      if (typeof window !== "undefined" && window.YT?.Player) return Promise.resolve()
      return new Promise((resolve) => {
        if (window.YT?.Player) {
          resolve()
          return
        }
        const tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        const firstScript = document.getElementsByTagName("script")[0]
        firstScript?.parentNode?.insertBefore(tag, firstScript)
        window.onYouTubeIframeAPIReady = () => resolve()
      })
    }

    loadYtApi().then(() => {
      if (mobileInfo.isEmbed && mobileVideo?.videoType === "youtube" && document.getElementById("reel-mobile-yt")) {
        mobileYtPlayerRef.current = new window.YT.Player("reel-mobile-yt", { events: {} })
      }
      if (desktopInfo.isEmbed && desktopVideo?.videoType === "youtube" && document.getElementById("reel-desktop-yt")) {
        desktopYtPlayerRef.current = new window.YT.Player("reel-desktop-yt", { events: {} })
      }
    })
  }, [isLoading, mobileInfo.isEmbed, desktopInfo.isEmbed, mobileVideo?.videoType, desktopVideo?.videoType])

  if (isLoading) {
    return (
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-12"></div>
            <div className="h-24 bg-gray-200 rounded mb-10"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white px-4 pt-4 pb-8 md:py-24 lg:pt-0 lg:pb-10">
      <div className="container mx-auto lg:px-4 flex flex-col">
        {/* Top text - mobile: arriba, desktop: abajo del video (order) */}
        <div className="mb-8 order-1 lg:order-2 lg:mb-2">
          <h2 className="text-5xl md:text-5xl font-boldstrom leading-[40px] text-[#1a1a1a]">
            {topTextLine1} {topTextLine2}
            <br className="block lg:hidden" />
            {topTextLine3}
          </h2>
          <p className="text-5xl md:text-5xl font-boldstrom leading-[40px] mt-2 text-[#FF2E8D]">
            {pinkTextLine1}
            <br className="block lg:hidden" />
            {pinkTextLine2}
          </p>
        </div>

        {/* Video - mobile: en medio, desktop: primero, full width */}
        <div className="relative w-full aspect-[3/4] md:aspect-video max-w-md mx-auto mb-8 rounded-2xl overflow-hidden lg:max-w-full lg:mx-0 lg:order-1 order-2">
          {/* Video móvil - visible solo en móvil/tablet */}
          <div className="relative w-full h-full block lg:hidden">
            {mobileInfo.url && mobileInfo.isEmbed ? (
              <iframe
                id={mobileVideo?.videoType === "youtube" ? "reel-mobile-yt" : undefined}
                src={mobileInfo.url}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Reel - Mobile"
              />
            ) : mobileInfo.url && (mobileVideo?.videoType === 'file' || mobileVideo?.videoType === 'url') ? (
              <video
                ref={mobileVideoRef}
                src={mobileInfo.url}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={mobileInfo.thumbnailUrl}
                alt="Reel video thumbnail"
                fill
                className="object-cover"
              />
            )}
          </div>
          {/* Video escritorio - visible solo en desktop */}
          <div className="relative w-full h-full hidden lg:block">
            {desktopInfo.url && desktopInfo.isEmbed ? (
              <iframe
                id={desktopVideo?.videoType === "youtube" ? "reel-desktop-yt" : undefined}
                src={desktopInfo.url}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Reel - Desktop"
              />
            ) : desktopInfo.url && (desktopVideo?.videoType === 'file' || desktopVideo?.videoType === 'url') ? (
              <video
                ref={desktopVideoRef}
                src={desktopInfo.url}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={desktopInfo.thumbnailUrl}
                alt="Reel video thumbnail"
                fill
                className="object-cover"
              />
            )}
          </div>
          {/* Overlay text */}
          {overlayText && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden">
              <span
                className="text-5xl md:text-7xl font-black italic text-white/90"
                style={{
                  textShadow: "2px 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                {overlayText}
              </span>
            </div>
          )}

          {/* Botón mute/unmute - solo si hay video con sonido */}
          {(mobileInfo.url || desktopInfo.url) && (
            <button
              type="button"
              onClick={toggleMute}
              className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
              aria-label={isMuted ? "Activar sonido" : "Desactivar sonido"}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {/* Bottom text */}
        <div className="text-left mb-8 order-3">
          <h3 className="text-5xl md:text-5xl font-boldstrom leading-[40px] text-[#1a1a1a]">
            CONVIÉRTETE EN UNA MARCA MEMORABLE.
          </h3>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center order-4 lg:justify-start">
          <a
            href="https://calendar.app.google/3ADtTxgb9j34WFAP9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF2E8D] hover:bg-[#FF2E8D] text-white text-[22px] tracking-wider px-6 py-4 rounded-full transition-colors w-full font-ambit text-center lg:max-w-md"
          >
            {ctaButtonText}
          </a>
        </div>
      </div>
    </section>
  )
}
