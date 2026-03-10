"use client"

import { PortfolioFeaturedMedia } from "./PortfolioFeaturedMedia"

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

export function PortfolioVideoGallery({ videoGallery, imageSecondary, brand, product }) {
  if (!videoGallery || videoGallery.length === 0) return null

  const playableVideos = videoGallery.filter(hasPlayableVideo)
  if (playableVideos.length === 0) return null

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-boldstrom text-[#1a1a1a] mb-6">
        Galería de Videos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playableVideos.map((video, index) => (
          <div key={index} className="w-full">
            <PortfolioFeaturedMedia
              video={video}
              image={null}
              imageSecondary={video?.thumbnail || imageSecondary}
              brand={brand}
              product={product}
              variant="gallery"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
