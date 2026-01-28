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
  *[_type == "portfolioItem"] | order(order asc) {
    _id,
    brand,
    product,
    image,
    order
  }
`

export const clientsQuery = groq`
  *[_type == "client"] | order(order asc) {
    _id,
    name,
    logo,
    order
  }
`
