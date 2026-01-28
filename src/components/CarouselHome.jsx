"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const portfolioItems = [
  {
    id: 1,
    image: "/portfolio-1.jpg",
    brand: "LA ROCHE POSAY",
    product: "ANTHELIOS UV AIR",
  },
  {
    id: 2,
    image: "/portfolio-2.jpg",
    brand: "OPPO",
    product: "RENO 6",
  },
  {
    id: 3,
    image: "/portfolio-3.jpg",
    brand: "SAMSUNG",
    product: "GALAXY S24",
  },
  {
    id: 4,
    image: "/portfolio-4.jpg",
    brand: "NIKE",
    product: "AIR MAX 2024",
  },
]

export function CarouselHome() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <p className="text-white/60 text-sm tracking-widest mb-8 md:mb-12">
          PORTAFILIO CARRUSEL
        </p>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {portfolioItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:pl-6 basis-[85%] md:basis-[45%] lg:basis-[40%]"
              >
                <div className="group cursor-pointer">
                  {/* Image Container with Frame Effect */}
                  <div className="relative bg-white rounded-2xl shadow-lg mb-4 md:mb-6">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={`${item.brand} - ${item.product}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

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
              </CarouselItem>
            ))}
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
