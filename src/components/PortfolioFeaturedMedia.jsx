"use client"

import { useState } from "react"
import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"
import { Player } from "./Player"

export function PortfolioFeaturedMedia({ video, image, brand, product }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVideoClick = () => {
    if (video) {
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Get thumbnail URL - use video thumbnail if available, otherwise use featured image
  const thumbnailUrl = video?.thumbnail
    ? urlFor(video.thumbnail).width(1200).height(800).url()
    : image
    ? urlFor(image).width(1200).height(800).url()
    : null

  // If there's a video, show video thumbnail with click handler
  if (video) {
    return (
      <>
        <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden">
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={handleVideoClick}
          >
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
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
            onClose={handleCloseModal}
          />
        )}
      </>
    )
  }

  // If no video but there's an image, show the image
  if (image && thumbnailUrl) {
    return (
      <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={`${brand} - ${product}`}
          fill
          className="object-cover"
          priority
        />
      </div>
    )
  }

  // If neither video nor image, return null
  return null
}
