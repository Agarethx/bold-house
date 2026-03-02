import { getPortfolioItemsPaginated } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../../../sanity/lib/image"

export default async function PortfolioPage({ searchParams }) {
  const params = await searchParams
  const page = parseInt(params?.page || '1', 10)
  const { items, totalPages, page: currentPage } = await getPortfolioItemsPaginated(page, 10)

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20 min-h-screen">
      {/* Title */}
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl leading-none uppercase">
          <span className="font-boldstrom text-[#1a1a1a]">{">"} PORTA</span>
          <br />
          <span className="text-5xl md:text-5xl lg:text-7xl font-boldstrom text-[#FF2E8D]">
            Folio
          </span>
        </h2>
      </div>

      {/* Portfolio Items */}
      <div className="space-y-12 mb-12 lg:rid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:space-y-0">
        {items.map((item) => {
          const imageUrl = item.image ? urlFor(item.image).width(1200).height(900).url() : null
          const slug = item.slug?.current || ''
          return (
            <Link key={item._id} href={`/portafolio/${slug}`}>
              <article className="cursor-pointer group mb-12">
                {imageUrl && (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden group mb-4">
                    <Image
                      src={imageUrl}
                      alt={`${item.brand} - ${item.product}`}
                      fill
                      className="object-cover"
                    />
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
              </article>
            </Link>
          )
        })}
      </div>

      {/* Pagination - Circular design */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-8 md:gap-12 mt-16">
          {/* Previous - Chevron left */}
          {currentPage > 1 ? (
            <Link
              href={`/portafolio?page=${currentPage - 1}`}
              className="relative block w-20 h-20 md:w-24 md:h-24 group cursor-pointer"
              aria-label="Página anterior"
            >
              <svg
                className="w-full h-full animate-spin-slow group-hover:[animation-play-state:paused]"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="circlePathPrev"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[8px] uppercase tracking-[0.3em] fill-[#1a1a1a] font-medium">
                  <textPath href="#circlePathPrev">
                    • BEBOLD • BELEADERS • BEBRAVE • BEBOLD
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-boldstrom text-[#1a1a1a] text-2xl md:text-6xl">{'<'}</span>
              </div>
            </Link>
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 opacity-30 pointer-events-none" aria-hidden />
          )}

          {/* Center - Grid (page 1 / view all) */}
          <Link
            href="/portafolio?page=1"
            className="relative block w-20 h-20 md:w-24 md:h-24 group cursor-pointer"
            aria-label="Ver página 1"
          >
            <svg
              className="w-full h-full animate-spin-slow group-hover:[animation-play-state:paused]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePathGrid"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[8px] uppercase tracking-[0.3em] fill-[#1a1a1a] font-medium">
                <textPath href="#circlePathGrid">
                  • BEBOLD • BELEADERS • BEBRAVE • BEBOLD
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-[#1a1a1a] rounded-sm" />
                <div className="w-2 h-2 md:w-3 md:h-3 bg-[#1a1a1a] rounded-sm" />
                <div className="w-2 h-2 md:w-3 md:h-3 bg-[#1a1a1a] rounded-sm" />
                <div className="w-2 h-2 md:w-3 md:h-3 bg-[#1a1a1a] rounded-sm" />
              </div>
            </div>
          </Link>

          {/* Next - Chevron right */}
          {currentPage < totalPages ? (
            <Link
              href={`/portafolio?page=${currentPage + 1}`}
              className="relative block w-20 h-20 md:w-24 md:h-24 group cursor-pointer"
              aria-label="Página siguiente"
            >
              <svg
                className="w-full h-full animate-spin-slow group-hover:[animation-play-state:paused]"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="circlePathNext"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[8px] uppercase tracking-[0.3em] fill-[#1a1a1a] font-medium">
                  <textPath href="#circlePathNext">
                    • BEBOLD • BELEADERS • BEBRAVE • BEBOLD
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-boldstrom text-[#1a1a1a] text-2xl md:text-6xl">{'>'}</span>
              </div>
            </Link>
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 opacity-30 pointer-events-none" aria-hidden />
          )}
        </div>
      )}
    </section>
  )
}
