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

export function RelatedPortfolioCarousel({ portfolioItems = [], currentSlug }) {
  // Filtrar el proyecto actual si se proporciona
  const filteredItems = currentSlug
    ? portfolioItems.filter((item) => item.slug?.current !== currentSlug)
    : portfolioItems

  // Si no hay items para mostrar, no renderizar nada
  if (filteredItems.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-12 lg:px-20">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-boldstrom text-[#1a1a1a] mb-2">
            Más proyectos
          </h2>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {filteredItems.map((item) => {
              const imageUrl = item.image ? urlFor(item.image).width(800).height(1000).url() : null
              return (
                <CarouselItem
                  key={item._id}
                  className="pl-4 md:pl-6 basis-[85%] md:basis-[45%] lg:basis-[40%]"
                >
                  <Link href={`/portafolio/${item.slug?.current}`}>
                    <div className="group cursor-pointer">
                      {/* Image Container with Frame Effect */}
                      {imageUrl && (
                        <div className="relative bg-white rounded-2xl shadow-lg mb-4 md:mb-6">
                          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={`${item.brand} - ${item.product}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </div>
                      )}

                      {/* Text Content */}
                      <div className="text-black">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                          {item.brand}
                        </h3>
                        <p className="text-lg md:text-xl font-light tracking-wide">
                          {item.product}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {/* Navigation - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:flex items-center gap-2 mt-8">
            <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-gray-300 bg-transparent text-[#1a1a1a] hover:bg-gray-100 hover:text-[#1a1a1a]" />
            <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-gray-300 bg-transparent text-[#1a1a1a] hover:bg-gray-100 hover:text-[#1a1a1a]" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
