import { client } from '../../sanity/lib/client'
import {
  blogPostsQuery,
  portfolioItemsQuery,
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

export async function getClients() {
  try {
    const clients = await client.fetch(clientsQuery)
    return clients
  } catch (error) {
    console.error('Error fetching clients:', error)
    return []
  }
}
