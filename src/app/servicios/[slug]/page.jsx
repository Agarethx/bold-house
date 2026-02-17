import { getServiceBySlug, getServices } from "@/lib/sanity"
import { notFound } from "next/navigation"
import Image from "next/image"
import { urlFor } from "../../../../sanity/lib/image"
import { PortableText } from "@portabletext/react"
import Link from "next/link"

export async function generateStaticParams() {
  try {
    const items = await getServices()
    return items
      .filter((item) => item.slug?.current)
      .map((item) => ({
        slug: item.slug.current,
      }))
  } catch (error) {
    console.error('Error generating static params:', error)
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

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug

  if (!slug || typeof slug !== 'string') {
    console.error('Invalid slug:', slug)
    notFound()
  }

  const item = await getServiceBySlug(slug)

  if (!item) {
    notFound()
  }

  const featuredImageUrl = item.image ? urlFor(item.image).width(1200).height(800).url() : null

  return (
    <article className="bg-white py-5 px-6 md:px-12 lg:px-20 min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <Link
          href="/servicios"
          className="text-sm text-gray-500 hover:text-[#1a1a1a] mb-4 inline-flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className="w-5 h-5"
          >
            <circle cx="100" cy="100" r="100" fill="#FF2E8D" />
            <path
              d="M131.4,86.6l-35.7,12.4,35.7,15v26.2l-65.2-29.8v-22.7l65.2-29.8v28.7Z"
              fill="#fff"
            />
          </svg>
          Volver a servicios
        </Link>
        <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none mb-4">
          <span className="font-boldstrom text-[#FF2E8D]">&gt;</span>
          {' '}
          <span className="font-boldstrom text-[#1a1a1a]">AGENCIA</span>
          {' '}
          <span className="font-boldstrom-outline text-[#1a1a1a]">{item.title}</span>
        </h1>
      </div>

      {/* Featured Image */}
      {featuredImageUrl && (
        <div className="relative w-full aspect-video mb-12 rounded-2xl overflow-hidden">
          <Image
            src={featuredImageUrl}
            alt={`AGENCIA ${item.title}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body Content */}
      {item.body && (
        <div className="prose prose-lg max-w-none mb-12">
          <PortableText value={item.body} components={portableTextComponents} />
        </div>
      )}

      {/* Services List */}
      {item.servicesList && item.servicesList.length > 0 && (
        <div className="mb-12">
          <ul className="space-y-3">
            {item.servicesList.map((service, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#FF2E8D] font-bold mr-3">&gt;</span>
                <span className="text-lg">{service}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gallery */}
      {item.gallery && item.gallery.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-boldstrom text-[#1a1a1a] mb-6">
            Galería
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item.gallery.map((image, index) => {
              const imageUrl = image ? urlFor(image).width(800).height(600).url() : null
              if (!imageUrl) return null
              return (
                <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`AGENCIA ${item.title} - Imagen ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-boldstrom text-[#1a1a1a] mb-6">
            &gt; TAGS
          </h2>
          <div className="flex flex-wrap gap-3">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-[#1a1a1a] hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
