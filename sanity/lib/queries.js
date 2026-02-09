import { groq } from 'next-sanity'

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    image,
    date,
    readTime,
    publishedAt
  }
`

export const portfolioItemsQuery = groq`
  *[_type == "portfolioItem"] | order(publishedAt desc) {
    _id,
    brand,
    product,
    slug,
    image,
    order,
    publishedAt
  }
`

export const portfolioItemBySlugQuery = groq`
  *[_type == "portfolioItem" && slug.current == $slug][0] {
    _id,
    brand,
    product,
    slug,
    image,
    video {
      videoType,
      videoFile {
        asset-> {
          _id,
          url,
          mimeType,
          size
        }
      },
      videoUrl,
      thumbnail,
      title,
      subtitle
    },
    body,
    gallery,
    tags,
    order,
    publishedAt
  }
`

export const portfolioItemsPaginatedQuery = groq`
  *[_type == "portfolioItem"] | order(publishedAt desc) [$start...$end] {
    _id,
    brand,
    product,
    slug,
    image,
    order,
    publishedAt
  }
`

export const portfolioItemsCountQuery = groq`
  count(*[_type == "portfolioItem"])
`

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, publishedAt desc) {
    _id,
    title,
    slug,
    image,
    excerpt,
    order,
    publishedAt
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    image,
    body,
    servicesList,
    gallery,
    tags,
    order,
    publishedAt
  }
`

export const servicesPaginatedQuery = groq`
  *[_type == "service"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    image,
    order,
    publishedAt
  }
`

export const servicesCountQuery = groq`
  count(*[_type == "service"])
`

export const clientsQuery = groq`
  *[_type == "client"] | order(order asc) {
    _id,
    name,
    logo,
    order
  }
`

export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    _id,
    menuItems[] | order(order asc) {
      label,
      href,
      isBold,
      isPink,
      order,
      subItems[] {
        label,
        href
      }
    },
    socialLinks[] | order(order asc) {
      platform,
      url,
      order
    }
  }
`

export const siteConfigQuery = groq`
  *[_type == "siteConfig"][0] {
    _id,
    title,
    videoBanner[] {
      name,
      videoType,
      videoFile {
        asset-> {
          _id,
          url,
          mimeType,
          size
        }
      },
      videoUrl,
      thumbnail,
      title,
      subtitle
    },
    videoReel[] {
      name,
      videoType,
      videoFile {
        asset-> {
          _id,
          url,
          mimeType,
          size
        }
      },
      videoUrl,
      thumbnail,
      title,
      subtitle
    }
  }
`
