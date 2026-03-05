"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { urlFor } from "../../sanity/lib/image"

const formatDate = (dateString) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, "0")
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export function RelatedBlogCarousel({ blogPosts = [], currentSlug }) {
  const filteredPosts = currentSlug
    ? blogPosts.filter((post) => post.slug?.current !== currentSlug)
    : blogPosts

  if (filteredPosts.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-boldstrom text-[#1a1a1a] mb-2 uppercase">
            Artículos relacionados
          </h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {filteredPosts.map((post) => {
              const imageUrl = post.image ? urlFor(post.image).width(800).height(1000).url() : null
              return (
                <CarouselItem
                  key={post._id}
                  className="pl-4 md:pl-6 basis-[85%] md:basis-[45%] lg:basis-[40%]"
                >
                  <Link href={`/blog/${post.slug?.current}`}>
                    <div className="group cursor-pointer">
                      {imageUrl && (
                        <div className="relative bg-white rounded-2xl shadow-lg mb-4 md:mb-6">
                          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={post.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      )}

                      <div className="text-black">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
                          {formatDate(post.date)} – {post.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <div className="hidden md:flex items-center gap-2 mt-8">
            <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-gray-300 bg-transparent text-[#1a1a1a] hover:bg-gray-100 hover:text-[#1a1a1a]" />
            <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-gray-300 bg-transparent text-[#1a1a1a] hover:bg-gray-100 hover:text-[#1a1a1a]" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
