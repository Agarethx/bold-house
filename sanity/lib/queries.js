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

export const clientsQuery = groq`
  *[_type == "client"] | order(order asc) {
    _id,
    name,
    logo,
    order
  }
`
