"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getBannerVideo } from "@/lib/sanity"
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

export function BigBanner() {
  const [video, setVideo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchVideo() {
      try {
        const videoData = await getBannerVideo()
        setVideo(videoData)
      } catch (error) {
        console.error('Error fetching banner video:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideo()
  }, [])

  // Get video URL based on type
  const getVideoUrl = () => {
    if (!video) return null

    switch (video.videoType) {
      case 'file':
        return video.videoFile?.asset?.url || null
      case 'youtube': {
        const videoId = getYouTubeId(video.videoUrl)
        return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0` : null
      }
      case 'vimeo': {
        const videoId = getVimeoId(video.videoUrl)
        return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1` : null
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
    ? urlFor(video.thumbnail).width(1200).height(600).url()
    : "/img/VIDEO_.png"

  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* BE BOLD Text */}
        <div className="flex flex-col items-start leading-[20px]">
          <div className="flex items-center">
            {/* Pink chevron */}
            <span className="text-[#e74895] font-black text-[150px] sm:text-7xl md:text-8xl lg:text-9xl leading-none mr-1 font-boldstrom">
              {'>'}
            </span>
            <span className="font-black text-[#242129] text-[150px] sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none font-boldstrom">
              BE
            </span>
          </div>
          <span className="font-black text-[#242129] text-[150px] sm:text-7xl md:text-8xl lg:text-9xl tracking-tight -mt-2 md:-mt-4 font-boldstrom leading-[104px]">
            BOLD
          </span>
        </div>

        {/* be brave, be leader text */}
        <p className="italic text-[#242129] text-[80px] sm:text-2xl md:text-3xl mt-1 md:mt-6 font-hoteight">
          be brave, be leader.
        </p>

        {/* Video/Image Container with Oval Shape */}
        <div className="w-full max-w-3xl mt-8 md:mt-12 relative">
          {/* Oval container */}
          <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            <div className="absolute inset-0 rounded-[100px] overflow-hidden"
                 style={{
                   borderRadius: '100px',
                   clipPath: 'ellipse(100% 50% at 50% 50%)'
                 }}>
              {isLoading ? (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              ) : videoUrl && isEmbedVideo ? (
                <iframe
                  src={videoUrl}
                  className="w-full h-full absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Banner Video"
                  style={{ border: 'none' }}
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
                  alt="Bold House - Be Bold, Be Brave, Be Leaders"
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* Rotating text circle - top left corner, no animation */}
            <div className="absolute -top-4 -left-4 md:top-6 md:left-6 w-32 h-32 md:w-40 md:h-40 pointer-events-none z-10">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="bannerCirclePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                </defs>
                <text className="text-[8px] md:text-[10px] uppercase tracking-widest fill-black font-bold">
                  <textPath href="#bannerCirclePath">
                    • BE BRAVE • BE BOLD • BE LEADERS • BE BRAVE • BE BOLD •
                  </textPath>
                </text>
              </svg>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <p className="text-[#242129] font-medium text-sm md:text-base mt-6">
          © 06 | 26
        </p>
      </div>
    </section>
  )
}
