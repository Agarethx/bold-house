import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g., "8 MIN READ" or "8/10 MIN READ"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    orderRankField({ type: 'blogPost' }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      date: 'date',
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
      }
    },
  },
}
