"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const services = [
  {
    title: "CREATIVIDAD",
    description:
      "CONCEPTUALIZACIÓN DE CAMPAÑAS CON STORYTELLING QUE ENGANCHA, ESTRATEGIAS BTL, ATL Y 360 QUE ROMPEN ESQUEMAS, Y PITCH DECKS CREATIVOS QUE VENDEN IDEAS CON IMPACTO.",
    image: "/services/creatividad.jpg",
  },
  {
    title: "MARKETING DIGITAL",
    description:
      "ESTRATEGIAS DE PERFORMANCE, SEO, SEM Y SOCIAL ADS QUE GENERAN RESULTADOS MEDIBLES. CAMPAÑAS QUE CONECTAN CON TU AUDIENCIA Y MAXIMIZAN TU ROI.",
    image: "/services/marketing.jpg",
  },
  {
    title: "PRODUCCIÓN",
    description:
      "PRODUCCIÓN AUDIOVISUAL DE ALTO NIVEL, DESDE SPOTS PUBLICITARIOS HASTA CONTENIDO PARA REDES SOCIALES. VIDEOS QUE CUENTAN HISTORIAS Y GENERAN ENGAGEMENT.",
    image: "/services/produccion.jpg",
  },
  {
    title: "BRANDING",
    description:
      "CONSTRUCCIÓN DE MARCAS CON IDENTIDAD ÚNICA. DISEÑO DE LOGOS, SISTEMAS VISUALES Y GUÍAS DE MARCA QUE POSICIONAN TU NEGOCIO EN LA MENTE DEL CONSUMIDOR.",
    image: "/services/branding.jpg",
  },
]

export function Services() {
  return (
    <section className="bg-[#1a1a1a] py-16 md:py-24 overflow-hidden">
      {/* Animated Background Text */}
      <div className="relative mb-8">
        {/* Top marquee - moves right */}
        <div className="overflow-hidden whitespace-nowrap">
          <div className="animate-marquee-right inline-block">
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-white inline-block">
              {"› BOLD SKILLS › BOLD SKILLS › BOLD SKILLS › BOLD SKILLS "}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-white inline-block">
              {"› BOLD SKILLS › BOLD SKILLS › BOLD SKILLS › BOLD SKILLS "}
            </span>
          </div>
        </div>

        {/* Bottom marquee - moves left */}
        <div className="overflow-hidden whitespace-nowrap -mt-4 md:-mt-6">
          <div className="animate-marquee-left inline-block">
            <span
              className="text-6xl md:text-8xl lg:text-9xl font-black inline-block"
              style={{
                WebkitTextStroke: "2px white",
                WebkitTextFillColor: "transparent",
              }}
            >
              {"SKILLS ‹ BOLD SKILLS ‹ BOLD SKILLS ‹ BOLD SKILLS ‹ BOLD "}
            </span>
            <span
              className="text-6xl md:text-8xl lg:text-9xl font-black inline-block"
              style={{
                WebkitTextStroke: "2px white",
                WebkitTextFillColor: "transparent",
              }}
            >
              {"SKILLS ‹ BOLD SKILLS ‹ BOLD SKILLS ‹ BOLD SKILLS ‹ BOLD "}
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
            {services.map((service, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col items-center text-center">
                  {/* Service Image */}
                  <div className="relative w-64 h-64 md:w-72 md:h-72 mb-6 rounded-3xl overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                    <span className="text-white">{">"}</span> {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-sm">
                    {service.description}
                  </p>

                  {/* Rotating Button */}
                  <div className="mt-8 relative w-24 h-24">
                    {/* Rotating text circle */}
                    <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
                      <defs>
                        <path
                          id={`circlePath-${index}`}
                          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        />
                      </defs>
                      <text className="text-[10px] uppercase tracking-widest fill-white">
                        <textPath href={`#circlePath-${index}`}>
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
            ))}
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
