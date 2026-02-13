import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity"
import { notFound } from "next/navigation"
import Image from "next/image"
import { urlFor } from "../../../../sanity/lib/image"
import { PortableText } from "@portabletext/react"
import Link from "next/link"

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts()
    return posts
      .filter((post) => post.slug?.current)
      .map((post) => ({
        slug: post.slug.current,
      }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export const dynamicParams = true

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      const imageUrl = urlFor(value).width(1200).height(800).url()
      return (
        <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-4 mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mb-3 mt-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mb-2 mt-4">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 text-lg leading-relaxed">{children}</p>,
  },
}

const formatDate = (dateString) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, "0")
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export default async function BlogPostDetailPage({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug

  if (!slug || typeof slug !== "string") {
    console.error("Invalid slug:", slug)
    notFound()
  }

  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImageUrl = post.image ? urlFor(post.image).width(1200).height(800).url() : null

  return (
    <article className="bg-white py-5 px-6 md:px-12 lg:px-20 min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/#blog"
          className="text-sm text-gray-500 hover:text-[#1a1a1a] mb-4 inline-block"
        >
          ← Volver al blog
        </Link>
        <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none mb-4">
          <span className="font-boldstrom text-[#e74895]">&gt;</span>{" "}
          <span className="font-boldstrom text-[#1a1a1a]">BLOG</span>{" "}
          <span className="font-boldstrom-outline text-[#1a1a1a]">{post.title}</span>
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {formatDate(post.date)} – {post.readTime}
        </p>
      </div>

      {/* Featured Image */}
      {featuredImageUrl && (
        <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden">
          <Image
            src={featuredImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body Content */}
      {post.body && (
        <div className="prose prose-lg max-w-none mb-12">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      )}
    </article>
  )
}
