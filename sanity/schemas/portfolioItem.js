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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which this item appears in the carousel',
      initialValue: 0,
    },
  ],
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
  ],
}
