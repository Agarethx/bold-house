import { getBlogPostsPaginated } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "../../../sanity/lib/image"

function formatDate(dateString) {
  if (!dateString) return ""
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, "0")
  const months = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
  ]
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export default async function BlogPage({ searchParams }) {
  const params = await searchParams
  const page = parseInt(params?.page || "1", 10)
  const { items: blogPosts, totalPages, page: currentPage } = await getBlogPostsPaginated(page, 9)

  return (
    <section id="blog" className="bg-white py-16 px-6 md:px-12 lg:px-20 min-h-screen">
      {/* Title */}
      <div className="mb-12">
        <h2 className="text-6xl md:text-6xl lg:text-7xl leading-[50px] lg:leading-[90%]">
          <span className="font-boldstrom text-[#1a1a1a]">{">"}Blog <br /> <span className="font-boldstrom text-[#FF2E8D]">BOLD</span></span>
        </h2>
      </div>

      {/* Blog Posts */}
      <div className="space-y-12 mb-12 lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:space-y-0">
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => {
            const imageUrl = post.image
              ? urlFor(post.image).width(1200).height(900).url()
              : null
            const slug = post.slug?.current || ""
            return (
              <Link key={post._id} href={`/blog/${slug}`}>
                <article className="cursor-pointer group mb-12">
                  <h3 className="font-bold text-lg md:text-xl text-[#1a1a1a] mb-4 lg:min-h-[80px]">
                    {post.title}
                  </h3>
                  {imageUrl && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden group mb-4">
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {formatDate(post.date)} – {post.readTime}
                  </p>
                </article>
              </Link>
            )
          })
        ) : (
          <p className="text-gray-500">No hay artículos disponibles</p>
        )}
      </div>

      {/* Pagination - Circular design */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-8 md:gap-12 mt-16">
          {/* Previous - Chevron left */}
          {currentPage > 1 ? (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="relative block w-20 h-20 md:w-24 md:h-24 group cursor-pointer"
              aria-label="Página anterior"
            >
              <svg
                className="w-full h-full animate-spin-slow group-hover:[animation-play-state:paused]"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="circlePathBlogPrev"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[8px] uppercase tracking-[0.3em] fill-[#1a1a1a] font-medium">
                  <textPath href="#circlePathBlogPrev">
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

          {/* Center - Grid (page 1) */}
          <Link
            href="/blog?page=1"
            className="relative block w-20 h-20 md:w-24 md:h-24 group cursor-pointer"
            aria-label="Ver página 1"
          >
            <svg
              className="w-full h-full animate-spin-slow group-hover:[animation-play-state:paused]"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePathBlogGrid"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[8px] uppercase tracking-[0.3em] fill-[#1a1a1a] font-medium">
                <textPath href="#circlePathBlogGrid">
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
              href={`/blog?page=${currentPage + 1}`}
              className="relative block w-20 h-20 md:w-24 md:h-24 group cursor-pointer"
              aria-label="Página siguiente"
            >
              <svg
                className="w-full h-full animate-spin-slow group-hover:[animation-play-state:paused]"
                viewBox="0 0 100 100"
              >
                <defs>
                  <path
                    id="circlePathBlogNext"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="text-[8px] uppercase tracking-[0.3em] fill-[#1a1a1a] font-medium">
                  <textPath href="#circlePathBlogNext">
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
