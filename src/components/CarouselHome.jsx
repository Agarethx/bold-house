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

export function CarouselHome({ portfolioItems = [] }) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-boldstrom leading-[33px] text-[#1a1a1a]">
            La valentíanos define, —
            <br />
            la estrategia nos guia —
          </h2>
          <p className="text-4xl md:text-5xl font-boldstrom leading-[33px] mt-2 text-[#e74895]">
            y la audacia
            <br />
            nos
            <br />
            representa
          </p>
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
            {portfolioItems.map((item) => {
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
            <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" />
            <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 h-12 w-12 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
