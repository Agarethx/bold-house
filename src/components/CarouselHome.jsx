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
    <section className="py-8 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-5xl md:text-5xl lg:text-7xl font-boldstrom leading-[85%] text-[#1a1a1a]">
            La valentía nos define,
            <br />
            la estrategia nos guia —
          </h2>
          <p className="text-5xl md:text-5xl lg:text-7xl font-boldstrom leading-[85%] mt-2 text-[#FF2E8D]">
            y la audacia
            <br className="block lg:hidden" />
            nos
            <br className="block lg:hidden" />
            representa
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full">
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

        {/* Circular Button with rotating text */}
        <div className="flex justify-center mt-12">
          <Link
            href="/portafolio"
            className="relative block w-24 h-24 md:w-28 md:h-28 group cursor-pointer"
            aria-label="Ver más artículos del blog">
            {/* Rotating text circle */}
            <svg
              className="w-full h-full animate-spin-slow"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[8px] uppercase tracking-[0.3em] fill-[#1a1a1a] font-medium">
                <textPath href="#circlePath">
                  • BEBOLD • BELEADERS • BEBRAVE • BEBOLD
                </textPath>
              </text>
            </svg>

            {/* Center icon - 2x2 grid */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1.5">
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#1a1a1a] rounded-sm" />
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#1a1a1a] rounded-sm" />
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#1a1a1a] rounded-sm" />
                <div className="w-3 h-3 md:w-3.5 md:h-3.5 bg-[#1a1a1a] rounded-sm" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
