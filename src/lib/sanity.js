import { client } from '../../sanity/lib/client'
import {
  blogPostsQuery,
  portfolioItemsQuery,
  portfolioItemBySlugQuery,
  portfolioItemsPaginatedQuery,
  portfolioItemsCountQuery,
  servicesQuery,
  serviceBySlugQuery,
  servicesPaginatedQuery,
  servicesCountQuery,
  clientsQuery,
  navigationQuery,
  siteConfigQuery,
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

export async function getServices() {
  try {
    const services = await client.fetch(servicesQuery)
    return services
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function getServiceBySlug(slug) {
  if (!slug || typeof slug !== 'string') {
    console.error('Invalid slug provided to getServiceBySlug:', slug)
    return null
  }

  try {
    const service = await client.fetch(serviceBySlugQuery, { slug })
    return service
  } catch (error) {
    console.error('Error fetching service:', error)
    return null
  }
}

export async function getServicesPaginated(page = 1, pageSize = 10) {
  try {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const [items, total] = await Promise.all([
      client.fetch(servicesPaginatedQuery, { start, end }),
      client.fetch(servicesCountQuery),
    ])
    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }
  } catch (error) {
    console.error('Error fetching paginated services:', error)
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

export async function getNavigation() {
  try {
    const navigation = await client.fetch(navigationQuery)
    return navigation || { menuItems: [], socialLinks: [] }
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return { menuItems: [], socialLinks: [] }
  }
}

export async function getSiteConfig() {
  try {
    const siteConfig = await client.fetch(siteConfigQuery)
    return siteConfig || { videoBanner: [], videoReel: [] }
  } catch (error) {
    console.error('Error fetching site config:', error)
    return { videoBanner: [], videoReel: [] }
  }
}

// Get the first video from videoReel array
export async function getReelVideo() {
  try {
    const siteConfig = await client.fetch(siteConfigQuery)
    return siteConfig?.videoReel?.[0] || null
  } catch (error) {
    console.error('Error fetching reel video:', error)
    return null
  }
}

// Get the first video from videoBanner array
export async function getBannerVideo() {
  try {
    const siteConfig = await client.fetch(siteConfigQuery)
    return siteConfig?.videoBanner?.[0] || null
  } catch (error) {
    console.error('Error fetching banner video:', error)
    return null
  }
}
