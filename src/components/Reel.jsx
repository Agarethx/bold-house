"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
  const [video, setVideo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchVideo() {
      try {
        const videoData = await getReelVideo()
        setVideo(videoData)
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

  // Get thumbnail URL
  const thumbnailUrl = video?.thumbnail
    ? urlFor(video.thumbnail).width(1200).height(800).url()
    : "/reel-thumbnail.jpg"

  // Get video URL based on type (with loop params for embeds)
  const getVideoUrl = () => {
    if (!video) return null

    switch (video.videoType) {
      case 'file':
        return video.videoFile?.asset?.url || null
      case 'youtube': {
        const videoId = getYouTubeId(video.videoUrl)
        // YouTube requires playlist=videoId for loop to work
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}` : null
      }
      case 'vimeo': {
        const videoId = getVimeoId(video.videoUrl)
        return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1` : null
      }
      case 'url':
        return video.videoUrl || null
      default:
        return null
    }
  }

  const videoUrl = getVideoUrl()
  const isEmbedVideo = video?.videoType === 'youtube' || video?.videoType === 'vimeo'

  if (isLoading) {
    return (
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
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
    <section className="bg-white px-4 pt-4 pb-8 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Top text */}
        <div className="mb-8">
          <h2 className="text-5xl md:text-5xl font-boldstrom leading-[40px] text-[#1a1a1a]">
            {topTextLine1} {topTextLine2}
            <br />
            {topTextLine3}
          </h2>
          <p className="text-5xl md:text-5xl font-boldstrom leading-[40px] mt-2 text-[#e74895]">
            {pinkTextLine1}
            <br />
            {pinkTextLine2}
          </p>
        </div>

        {/* Video - Always visible, loop */}
        <div className="relative w-full aspect-[3/4] md:aspect-video max-w-md mx-auto mb-8 rounded-2xl overflow-hidden">
          <div className="relative w-full h-full">
            {videoUrl && isEmbedVideo ? (
              <iframe
                src={videoUrl}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Reel"
              />
            ) : videoUrl && (video?.videoType === 'file' || video?.videoType === 'url') ? (
              <video
                src={videoUrl}
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
                src={thumbnailUrl}
                alt="Reel video thumbnail"
                fill
                className="object-cover"
              />
            )}
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
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-left mb-8">
          <h3 className="text-5xl md:text-5xl font-boldstrom leading-[40px] text-[#1a1a1a]">
            CONVIÉRTETE EN UNA MARCA MEMORABLE.
          </h3>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <a
            href="https://calendar.app.google/3ADtTxgb9j34WFAP9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#e74895] hover:bg-[#e74895] text-white text-[22px] tracking-wider px-6 py-4 rounded-full transition-colors w-full font-ambit text-center"
          >
            {ctaButtonText}
          </a>
        </div>
      </div>
    </section>
  )
}
