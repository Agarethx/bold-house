export default {
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'product',
      title: 'Product',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.brand}-${doc.product}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Featured image (shown if no video is provided). Either image or video must be provided.',
    },
    {
      name: 'imageSecondary',
      title: 'Featured Image secondary',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Featured image (shown if no video is provided). Either image or video must be provided.',
    },
    {
      name: 'video',
      title: 'Featured Video',
      type: 'object',
      description: 'Video to display instead of featured image. If video is provided, it will be shown instead of the image.',
      fields: [
        {
          name: 'videoType',
          title: 'Video Type',
          type: 'string',
          options: {
            list: [
              { title: 'Video File', value: 'file' },
              { title: 'YouTube URL', value: 'youtube' },
              { title: 'Vimeo URL', value: 'vimeo' },
              { title: 'External URL', value: 'url' },
            ],
            layout: 'radio',
          },
          initialValue: 'file',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'videoFile',
          title: 'Video File',
          type: 'file',
          description: 'Upload a video file (MP4, WebM, etc.)',
          options: {
            accept: 'video/*',
          },
          hidden: ({ parent }) => parent?.videoType !== 'file',
        },
        {
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'YouTube, Vimeo, or direct video URL',
          hidden: ({ parent }) => parent?.videoType === 'file',
        },
        {
          name: 'thumbnail',
          title: 'Video Thumbnail',
          type: 'image',
          description: 'Thumbnail image for the video (optional, will use featured image if not provided)',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'title',
          title: 'Video Title',
          type: 'string',
          description: 'Título principal del video (ej: NIKE)',
        },
        {
          name: 'subtitle',
          title: 'Video Subtitle / Bajada',
          type: 'string',
          description: 'Subtítulo o bajada del video (ej: LEGADO AIR MAX)',
        },
      ],
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
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which this item appears in the carousel',
      initialValue: 0,
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  validation: (Rule) =>
    Rule.custom((doc) => {
      if (!doc.image && !doc.video) {
        return 'Either featured image or featured video must be provided'
      }
      return true
    }),
  preview: {
    select: {
      brand: 'brand',
      product: 'product',
      media: 'image',
    },
    prepare({ brand, product, media }) {
      return {
        title: `${brand} - ${product}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Published Date',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
}
