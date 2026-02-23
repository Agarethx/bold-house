"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getServices } from "@/lib/sanity"
import { urlFor } from "../../sanity/lib/image"

export function Services() {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const servicesData = await getServices()
        setServices(servicesData)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [])
  return (
    <section className="bg-[#242129] py-8 md:py-24 overflow-hidden">
      {/* Animated Background Text */}
      <div className="relative mb-5">
        {/* Top marquee - moves right */}
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee-right inline-block">
            <span className="text-8xl md:text-8xl lg:text-9xl font-black text-[#FF2E8D] inline-block font-boldstrom">
              {"> BOLD SKILLS > BOLD SKILLS > BOLD SKILLS > BOLD SKILLS "}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#FF2E8D] inline-block font-boldstrom">
              {"> BOLD SKILLS > BOLD SKILLS > BOLD SKILLS > BOLD SKILLS "}
            </span>
          </div>
        </div>

        {/* Bottom marquee - moves left */}
        <div className="overflow-hidden whitespace-nowrap -mt-1 md:-mt-6">
          <div className="animate-marquee-left inline-block">
            <span
              className="text-8xl md:text-8xl lg:text-9xl text-white inline-block font-boldstrom">
              {"CASA CREATIVA < CASA CREATIVA < CASA CREATIVA < CASA CREATIVA < CASA CREATIVA "}
            </span>
            <span
              className="text-6xl md:text-8xl lg:text-9xl text-white inline-block font-boldstrom">
              {"CASA CREATIVA < CASA CREATIVA < CASA CREATIVA < CASA CREATIVA < CASA CREATIVA "}
            </span>
          </div>
        </div>
      </div>

      {/* Services Carousel */}
      <div className="container mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={`skeleton-${index}`} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="flex flex-col items-center text-left">
                    <div className="relative w-64 h-64 md:w-72 md:h-72 mb-6 rounded-3xl overflow-hidden bg-gray-700 animate-pulse" />
                    <div className="h-8 w-48 bg-gray-700 rounded mb-4 animate-pulse" />
                    <div className="h-4 w-full bg-gray-700 rounded mb-2 animate-pulse" />
                    <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
                  </div>
                </CarouselItem>
              ))
            ) : services.length > 0 ? (
              services.map((service, index) => {
                const baseImageUrl = service.image
                  ? urlFor(service.image).width(800).height(450).fit("max").url()
                  : "/placeholder.svg"
                const imageUrl = service._updatedAt && baseImageUrl !== "/placeholder.svg"
                  ? `${baseImageUrl}&updated=${service._updatedAt}`
                  : baseImageUrl
                const imageAssetId = service.image?.asset?._id || service.image?.asset?._ref || service._id

                return (
                  <CarouselItem key={service._id || index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="flex flex-col items-center text-left">
                      {/* Service Image */}
                      <Link
                        href={`/servicios/${service.slug?.current || ""}`}
                        className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden group"
                      >
                        <Image
                          key={imageAssetId}
                          src={imageUrl}
                          alt={service.title || "Service"}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      {/* Service Title */}
                      <h3 className="text-5xl md:text-3xl  text-white mb-4 font-boldstrom text-left w-full">
                        <span className="text-white">{">"}</span> {service.title || "SERVICE"}
                      </h3>

                      {/* Service Excerpt */}
                      {service.excerpt && (
                        <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-sm mb-4 uppercase lg:max-w-full lg:min-h-[100px]">
                          {service.excerpt}
                        </p>
                      )}

                      {/* Rotating Button */}
                      <div className="mt-8 relative w-24 h-24">
                        {/* Rotating text circle */}
                        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                          <defs>
                            <path
                              id={`circlePath-${service._id || index}`}
                              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            />
                          </defs>
                          <text className="text-[10px] uppercase tracking-widest fill-white">
                            <textPath href={`#circlePath-${service._id || index}`}>
                              • BEBOLD • BELEADERS • BEBRAVE • BEBOLD •
                            </textPath>
                          </text>
                        </svg>

                        {/* Center grid icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="grid grid-cols-2 gap-1">
                            <div className="w-3 h-3 bg-white rounded-sm" />
                            <div className="w-3 h-3 bg-white rounded-sm" />
                            <div className="w-3 h-3 bg-white rounded-sm" />
                            <div className="w-3 h-3 bg-white rounded-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                )
              })
            ) : (
              <CarouselItem className="pl-4">
                <div className="text-white text-center py-8">
                  No hay servicios disponibles
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 bg-transparent border-white text-white hover:bg-white hover:text-black" />
            <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 bg-transparent border-white text-white hover:bg-white hover:text-black" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
