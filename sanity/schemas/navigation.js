export default {
  name: 'navigation',
  title: 'Navigation Menu',
  type: 'document',
  fields: [
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link (href)',
              type: 'string',
              description: 'URL path (e.g., "/", "/servicios", "/portafolio")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isBold',
              title: 'Bold Style',
              type: 'boolean',
              description: 'Display this item in bold (default: true)',
              initialValue: true,
            },
            {
              name: 'isPink',
              title: 'Pink Color',
              type: 'boolean',
              description: 'Display this item in pink color (for active/selected items)',
              initialValue: false,
            },
            {
              name: 'subItems',
              title: 'Sub Menu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'href',
                      title: 'Link (href)',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                },
              ],
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              description: 'Order in which this item appears',
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Behance', value: 'behance' },
                  { title: 'Vimeo', value: 'vimeo' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Order',
              type: 'number',
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Navigation Menu',
      }
    },
  },
}
