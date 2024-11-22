// collections/News.ts

import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
}
