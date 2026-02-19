import Image from "next/image"
import Link from "next/link"
import { getBlogPosts } from "@/lib/sanity"
import { urlFor } from "../../sanity/lib/image"

export async function Blog() {
  const allPosts = await getBlogPosts()
  const blogPosts = allPosts.slice(0, 3)

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  }

  return (
    <section id="blog" className="bg-white py-8 px-4 md:px-12 lg:px-20">
      {/* Title */}
      <div className="mb-12">
        <h2 className="text-5xl md:text-6xl lg:text-7xl leading-none">
          <span className="font-boldstrom text-[#1a1a1a]">#BLOG —</span>
          <br />
          <span className="text-5xl md:text-5xl lg:text-6xl font-boldstrom text-[#FF2E8D]">
            BOLD
          </span>
        </h2>
      </div>

      {/* Blog Posts */}
      <div className="space-y-12 mb-12">
        {blogPosts.map((post) => {
          const imageUrl = post.image ? urlFor(post.image).width(1200).height(900).url() : null
          const slug = post.slug?.current || ""
          return (
            <Link key={post._id} href={`/blog/${slug}`}>
              <article className="cursor-pointer group mb-12">
                <h3 className="font-bold text-lg md:text-xl text-[#1a1a1a] mb-4">
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
        })}
      </div>

      {/* Circular Button with rotating text */}
      <div className="flex justify-center">
        <Link
          href="/blog"
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
    </section>
  )
}
