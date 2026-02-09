"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getReelVideo } from "@/lib/sanity"
import { urlFor } from "../../sanity/lib/image"
import { Player } from "./Player"

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
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleVideoClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

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
    <section className="bg-white px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Top text */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-boldstrom leading-[33px] text-[#1a1a1a]">
            {topTextLine1} {topTextLine2}
            <br />
            {topTextLine3}
          </h2>
          <p className="text-4xl md:text-5xl font-boldstrom leading-[33px] mt-2 text-[#e74895]">
            {pinkTextLine1}
            <br />
            {pinkTextLine2}
          </p>
        </div>

        {/* Video/Image thumbnail - Always visible */}
        <div className="relative w-full aspect-[3/4] md:aspect-video max-w-md mx-auto mb-12 rounded-2xl overflow-hidden">
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={handleVideoClick}
          >
            <Image
              src={thumbnailUrl}
              alt="Reel video thumbnail"
              fill
              className="object-cover transition-opacity group-hover:opacity-90"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg
                  className="w-10 h-10 md:w-12 md:h-12 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Overlay text */}
            {overlayText && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
        <div className="text-left mb-10">
          <h3 className="text-4xl md:text-4xl font-boldstrom leading-[33px] text-[#1a1a1a]">
            CONVIÉRTETE EN UNA MARCA MEMORABLE.
          </h3>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={scrollToForm}
            className="bg-[#E91E8C] hover:bg-[#d11a7d] text-white font-bold text-lg tracking-wider px-6 py-6 rounded-full transition-colors w-full font-boldstrom"
          >
            {ctaButtonText}
          </button>
        </div>
      </div>

      {/* Video Modal/Popup - Using Player Component */}
      {isModalOpen && video && (
        <Player
          video={video}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}
    </section>
  )
}
