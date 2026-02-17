import { getServicesPaginated } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../../../sanity/lib/image"

export default async function ServicesPage({ searchParams }) {
  const page = parseInt(searchParams?.page || '1', 10)
  const { items, totalPages, page: currentPage } = await getServicesPaginated(page, 10)

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20 min-h-screen">
      {/* Title */}
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl leading-none">
          <span className="font-boldstrom text-[#1a1a1a]">#SERVICIOS —</span>
          <br />
          <span className="text-5xl md:text-5xl lg:text-6xl font-boldstrom text-[#FF2E8D]">
            BOLD
          </span>
        </h2>
      </div>

      {/* Services Items */}
      <div className="space-y-12 mb-12">
        {items.map((item) => {
          const imageUrl = item.image ? urlFor(item.image).width(1200).height(900).url() : null
          const slug = item.slug?.current || ''
          return (
            <Link key={item._id} href={`/servicios/${slug}`}>
              <article className="cursor-pointer group">
                {imageUrl && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-3">
                    <Image
                      src={imageUrl}
                      alt={`AGENCIA ${item.title}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                  {/* Text Content */}
                  <div className="text-black">
                    <h3 className="text-4xl md:text-2xl tracking-tight font-boldstrom">
                      {">"} AGENCIA
                    </h3>
                    <p className="text-4xl md:text-2xl tracking-tight font-boldstrom text-[#FF2E8D]">
                      {item.title}
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
              href={`/servicios?page=${currentPage - 1}`}
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
              href={`/servicios?page=${currentPage + 1}`}
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
