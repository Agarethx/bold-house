import { getBlogPosts } from "@/lib/sanity"
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

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()

  return (
    <section id="blog" className="bg-white py-16 px-6 md:px-12 lg:px-20 min-h-screen">
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
        {blogPosts.length > 0 ? (
          blogPosts.map((post) => {
            const imageUrl = post.image
              ? urlFor(post.image).width(1200).height(900).url()
              : null
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
          })
        ) : (
          <p className="text-gray-500">No hay artículos disponibles</p>
        )}
      </div>
    </section>
  )
}
