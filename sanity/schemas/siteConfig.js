export default {
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Configuration Title',
      type: 'string',
      description: 'Internal title for this configuration',
      initialValue: 'Site Configuration',
    },
    {
      name: 'videoBanner',
      title: 'Video Banner',
      type: 'array',
      description: 'Videos for the Banner/Player section',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Video Name',
              type: 'string',
              description: 'Internal name to identify this video',
              validation: (Rule) => Rule.required(),
            },
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
              description: 'Thumbnail image for the video',
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
          preview: {
            select: {
              title: 'name',
              subtitle: 'videoType',
              media: 'thumbnail',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Unnamed Video',
                subtitle: subtitle ? `Type: ${subtitle}` : 'No type',
                media,
              }
            },
          },
        },
      ],
    },
    {
      name: 'videoReel',
      title: 'Video Reel',
      type: 'array',
      description: 'Videos for the Reel section',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Video Name',
              type: 'string',
              description: 'Internal name to identify this video',
              validation: (Rule) => Rule.required(),
            },
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
              description: 'Thumbnail image for the video',
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
          preview: {
            select: {
              title: 'name',
              subtitle: 'videoType',
              media: 'thumbnail',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Unnamed Video',
                subtitle: subtitle ? `Type: ${subtitle}` : 'No type',
                media,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Configuration',
        subtitle: 'Video Banner & Video Reel',
      }
    },
  },
}
