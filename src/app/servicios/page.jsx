import { getServicesPaginated } from "@/lib/sanity"
import { portableTextToPlain } from "@/lib/portableTextPlain"
import { ServiceListTitle } from "@/components/ServiceTitlePortable"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../../../sanity/lib/image"

export const revalidate = 60

export default async function ServicesPage({ searchParams }) {
  const page = parseInt(searchParams?.page || '1', 10)
  const { items, totalPages, page: currentPage } = await getServicesPaginated(page, 10)

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-20 min-h-screen container mx-auto">
      {/* Title */}
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl leading-[85%] uppercase">
          <span className="font-boldstrom text-[#1a1a1a]">{">"}Skills—</span>
          <br />
          <span className="text-5xl md:text-5xl lg:text-7xl font-boldstrom text-[#FF2E8D] leading-[85%]">
            Bold.
          </span>
        </h2>
      </div>

      {/* Services Items */}
      <div className="space-y-12 mb-12 lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:space-y-0">
        {items.map((item) => {
          const imageUrl = item.image ? urlFor(item.image).width(1200).height(675).fit("max").url() : null
          const slug = item.slug?.current || ''
          const titlePlain = portableTextToPlain(item.title)
          return (
            <Link key={item._id} href={`/servicios/${slug}`}>
              <article className="cursor-pointer group mb-12">
                {imageUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-3">
                    <Image
                      src={imageUrl}
                      alt={titlePlain || 'Servicio'}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                  {/* Text Content */}
                  <div className="text-black">
                    <h3 className="text-xl md:text-2xl tracking-tight">
                      <span className="font-bold">{">"}</span>{' '}
                      <ServiceListTitle value={item.title} />
                    </h3>
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
