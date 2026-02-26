"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
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

  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 3000, stopOnInteraction: false }),
    []
  )

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
    <section className="bg-[#242129] py-8 md:py-24 lg:py-5 overflow-hidden lg:pb-[90px]">
      {/* Animated Background Text */}
      <div className="relative mb-10">
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
        <div className="overflow-hidden whitespace-nowrap -mt-1 md:-mt-6 lg:mt-1">
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
            align: "center",
            loop: true,
            containScroll: "trimSnaps",
          }}
          plugins={[autoplayPlugin]}
          className="w-full"
        >
          <CarouselContent className="-ml-0 pl-4">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={`skeleton-${index}`} className="basis-full md:basis-1/2 lg:basis-1/3 mr-4 lg:mr-[100px]">
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
                  <CarouselItem key={service._id || index} className="!pl-0 basis-full md:basis-1/2 lg:basis-1/3 mr-4 lg:mr-[100px]">
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
                    </div>
                  </CarouselItem>
                )
              })
            ) : (
              <CarouselItem className="!pl-0 mr-4 lg:mr-[100px]">
                <div className="text-white text-center py-8">
                  No hay servicios disponibles
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <div className="flex justify-center gap-4 mb-8 lg:mb-0">
            {/* Rotating Button */}
            <Link href="/servicios" className="relative block w-24 h-24 md:w-28 md:h-28 group cursor-pointer">
            <div className="mt-8 relative w-24 h-24">
              {/* Rotating text circle */}
              <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                <defs>
                  <path
                    id={`circlePath-1`}
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[10px] uppercase tracking-widest fill-white">
                  <textPath href={`#circlePath-1`}>
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
            </Link>
          </div>
        </Carousel>
      </div>
    </section>
  )
}
