import { getPortfolioItemsPaginated } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../../../sanity/lib/image"

export default async function PortfolioPage({ searchParams }) {
  const page = parseInt(searchParams?.page || '1', 10)
  const { items, totalPages, page: currentPage } = await getPortfolioItemsPaginated(page, 10)

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20 min-h-screen">
      {/* Title */}
      <div className="mb-12">
        <h2 className="text-6xl md:text-6xl lg:text-7xl leading-[45px]">
          <span className="font-boldstrom text-[#1a1a1a]">{">"}PORTA <br /> <span className="font-boldstrom text-[#FF2E8D]">FOLIO</span></span>
        </h2>
      </div>

      {/* Portfolio Items */}
      <div className="space-y-12 mb-12">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          {currentPage > 1 && (
            <Link
              href={`/portafolio?page=${currentPage - 1}`}
              className="px-6 py-2 border border-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              Anterior
            </Link>
          )}

          <span className="text-sm text-gray-500">
            Página {currentPage} de {totalPages}
          </span>

          {currentPage < totalPages && (
            <Link
              href={`/portafolio?page=${currentPage + 1}`}
              className="px-6 py-2 border border-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-colors"
            >
              Siguiente
            </Link>
          )}
        </div>
      )}
    </section>
  )
}
