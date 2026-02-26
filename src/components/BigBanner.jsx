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
    <section className="w-full bg-white py-4 md:py-12 lg:pt-16 lg:pb-0">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row lg:items-center lg:gap-8 items-center">
        {/* Text block - full width en escritorio (video oculto), 40% en mobile con video */}
        <div className="flex flex-col lg:w-full">
          {/* BE BOLD Text */}
          <div className="flex flex-col lg:flex-row lg:items-center items-start leading-[20px] lg:leading-auto lg:justify-center">
            <div className="flex items-center">
              {/* Pink chevron */}
              <span className="text-[#FF2E8D] text-[150px] sm:text-7xl md:text-8xl lg:text-[200px] leading-none mr-1 font-boldstrom">
                {'>'}
              </span>
              <span className="text-[#201b25] text-[150px] sm:text-7xl md:text-8xl lg:text-[200px] tracking-tight leading-none font-boldstrom">
                BE
              </span>
            </div>
            <span className="text-[#201b25] text-[150px] sm:text-7xl md:text-8xl lg:text-[200px] tracking-tight -mt-2 lg:mt-0 md:-mt-4 font-boldstrom leading-[104px] lg:leading-[200px]">
              BOLD
            </span>
          </div>

          {/* be brave, be leader text */}
          <p className="italic text-[#201b25] text-center text-[80px] sm:text-2xl md:text-3xl lg:text-[150px] mt-1 md:mt-6 font-hoteight lg:text-center lg:-mt-6">
            be brave, be leader.
          </p>

          {/* Copyright */}
          <p className="text-[#242129] font-medium text-sm md:text-base mt-6 hidden">
            © 06 | 26
          </p>
        </div>

        {/* Video/Image Container - oculto en escritorio, visible en mobile */}
        <div className="w-full lg:w-[60%] max-w-3xl lg:max-w-none mt-4 md:mt-12 lg:mt-0 relative lg:hidden">
          {/* Oval container */}
          <div className="relative w-full" style={{ paddingBottom: '50%' }}>
            <div className="absolute inset-0 rounded-[100px] overflow-hidden">
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
            <div className="absolute -top-5 left-0 md:top-6 md:left-6 w-22 h-22 md:w-40 md:h-40 pointer-events-none z-10">
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <defs>
                  <path
                    id="bannerCirclePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                </defs>
                <text className="text-[10px] md:text-[10px] uppercase tracking-widest fill-black font-bold">
                  <textPath href="#bannerCirclePath">
                    • BE BRAVE • BE BOLD • BE LEADERS
                  </textPath>
                </text>
              </svg>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
