import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Bold House CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Contenido')
          .items([
            orderableDocumentListDeskItem({
              type: 'blogPost',
              title: 'Blog',
              S,
              context,
            }),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'blogPost'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
