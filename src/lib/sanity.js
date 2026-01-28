import { client } from '../../sanity/lib/client'
import {
  blogPostsQuery,
  portfolioItemsQuery,
  portfolioItemBySlugQuery,
  portfolioItemsPaginatedQuery,
  portfolioItemsCountQuery,
  clientsQuery,
} from '../../sanity/lib/queries'

export async function getBlogPosts() {
  try {
    const posts = await client.fetch(blogPostsQuery)
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getPortfolioItems() {
  try {
    const items = await client.fetch(portfolioItemsQuery)
    return items
  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return []
  }
}

export async function getPortfolioItemBySlug(slug) {
  if (!slug || typeof slug !== 'string') {
    console.error('Invalid slug provided to getPortfolioItemBySlug:', slug)
    return null
  }

  try {
    const item = await client.fetch(portfolioItemBySlugQuery, { slug })
    return item
  } catch (error) {
    console.error('Error fetching portfolio item:', error)
    return null
  }
}

export async function getPortfolioItemsPaginated(page = 1, pageSize = 10) {
  try {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const [items, total] = await Promise.all([
      client.fetch(portfolioItemsPaginatedQuery, { start, end }),
      client.fetch(portfolioItemsCountQuery),
    ])
    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  } catch (error) {
    console.error('Error fetching paginated portfolio items:', error)
    return {
      items: [],
      total: 0,
      page,
      pageSize,
      totalPages: 0,
    }
  }
}

export async function getClients() {
  try {
    const clients = await client.fetch(clientsQuery)
    return clients
  } catch (error) {
    console.error('Error fetching clients:', error)
    return []
  }
}
