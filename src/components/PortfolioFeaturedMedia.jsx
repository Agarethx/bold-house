"use client"

import { useState } from "react"
import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"
import { Player } from "./Player"

function hasPlayableVideo(video) {
  if (!video) return false
  switch (video.videoType) {
    case "file":
      return !!video.videoFile?.asset?.url
    case "youtube":
    case "vimeo":
    case "url":
      return !!video.videoUrl
    default:
      return false
  }
}

export function PortfolioFeaturedMedia({ video, image, imageSecondary, brand, product }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hasVideo = hasPlayableVideo(video)

  const handleVideoClick = () => {
    if (hasVideo) {
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Get thumbnail URL - video.thumbnail → imageSecondary
  const thumbnailUrl = video?.thumbnail
    ? urlFor(video.thumbnail).width(1200).height(800).url()
    : imageSecondary
    ? urlFor(imageSecondary).width(1200).height(800).url()
    : null

  // If no video: show only imageSecondary
  const imageSecondaryUrl = imageSecondary ? urlFor(imageSecondary).width(1200).height(800).url() : null

  // If there's playable video, show video thumbnail + play button
  if (hasVideo) {
    return (
      <>
        <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden">
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={handleVideoClick}
          >
            {imageSecondaryUrl && (
              <Image
                src={imageSecondaryUrl}
                alt={`${brand} - ${product}`}
                fill
                className="object-cover transition-opacity group-hover:opacity-90"
                priority
              />
            )}
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
          </div>
        </div>

        {/* Video Modal/Popup - Using Player Component */}
        {isModalOpen && (
          <Player
            video={video}
            isOpen={true}
            imageSecondary={imageSecondaryUrl}
            onClose={handleCloseModal}
          />
        )}
      </>
    )
  }

  if (imageSecondaryUrl) {
    return (
      <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden">
        <Image
          src={imageSecondaryUrl}
          alt={`${brand} - ${product}`}
          fill
          className="object-cover"
          priority
        />
      </div>
    )
  }

  return null
}
